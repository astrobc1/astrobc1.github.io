#!/usr/bin/env python3
"""
Script to download exoplanet data from NASA Exoplanet Archive
and save it as a CSV file for use in the web application.

This script respects NASA's API by making a single bulk request
instead of multiple individual requests from the client.
"""

import requests
import json
from datetime import datetime
import os

def download_exoplanet_data():
    """
    Download exoplanet data from NASA Exoplanet Archive
    """
    print("Downloading exoplanet data from NASA Exoplanet Archive...")
    
    # NASA Exoplanet Archive API endpoint
    # Using the Planetary Systems Composite Parameters table (pscomppars)
    # This contains the most up-to-date and vetted parameters
    base_url = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync"
    
    # SQL query to get all relevant exoplanet data
    query = """
    SELECT 
        pl_name,
        hostname,
        sy_snum,
        sy_pnum,
        discoverymethod,
        disc_year,
        pl_orbper,
        pl_orbsmax,
        pl_rade,
        pl_radj,
        pl_masse,
        pl_massj,
        pl_eqt,
        st_rad,
        st_mass,
        st_teff,
        sy_dist,
        ra,
        dec
    FROM pscomppars 
    WHERE 
        pl_orbper IS NOT NULL 
        AND pl_orbsmax IS NOT NULL 
        AND (pl_radj IS NOT NULL OR pl_rade IS NOT NULL)
        AND hostname IS NOT NULL
    ORDER BY hostname, pl_orbper
    """
    
    # Parameters for the API request
    params = {
        'query': query,
        'format': 'json'
    }
    
    try:
        # Make the request
        response = requests.get(base_url, params=params, timeout=60)
        response.raise_for_status()
        
        # Parse JSON response
        data = response.json()
        print(f"Successfully downloaded {len(data)} exoplanet records")
        
        # Process data without pandas
        
        # Data cleaning and processing
        print("Processing and cleaning data...")
        
        # Clean the data
        cleaned_data = []
        
        for planet in data:
            # Check for required fields
            if not all([
                planet.get('pl_name'),
                planet.get('hostname'),
                planet.get('pl_orbper'),
                planet.get('pl_orbsmax')
            ]):
                continue
                
            # Validate numeric values
            try:
                period = float(planet['pl_orbper']) if planet['pl_orbper'] else 0
                sma = float(planet['pl_orbsmax']) if planet['pl_orbsmax'] else 0
                
                if period <= 0 or sma <= 0:
                    continue
                    
                # Get radius data
                radj = float(planet['pl_radj']) if planet.get('pl_radj') else None
                rade = float(planet['pl_rade']) if planet.get('pl_rade') else None
                
                # Need at least one radius measurement
                if radj is None and rade is None:
                    continue
                    
                # Convert between radius units if needed
                if radj is None and rade is not None:
                    radj = rade / 11.209  # Convert Earth to Jupiter radii
                if rade is None and radj is not None:
                    rade = radj * 11.209  # Convert Jupiter to Earth radii
                    
            except (ValueError, TypeError):
                continue
                
            # Add to cleaned data
            planet_clean = {
                'pl_name': planet['pl_name'],
                'hostname': planet['hostname'],
                'sy_snum': planet.get('sy_snum'),
                'sy_pnum': planet.get('sy_pnum'),
                'discoverymethod': planet.get('discoverymethod'),
                'disc_year': planet.get('disc_year'),
                'pl_orbper': period,
                'pl_orbsmax': sma,
                'pl_rade': rade,
                'pl_radj': radj,
                'pl_masse': planet.get('pl_masse'),
                'pl_massj': planet.get('pl_massj'),
                'pl_eqt': planet.get('pl_eqt'),
                'st_rad': planet.get('st_rad'),
                'st_mass': planet.get('st_mass'),
                'st_teff': planet.get('st_teff'),
                'sy_dist': planet.get('sy_dist'),
                'ra': planet.get('ra'),
                'dec': planet.get('dec'),
                'download_date': datetime.now().isoformat()
            }
            cleaned_data.append(planet_clean)
        
        print(f"After cleaning: {len(cleaned_data)} valid records")
        
        # Sort by system name and orbital period
        cleaned_data.sort(key=lambda x: (x['hostname'], x['pl_orbper']))
        
        # Create output directory if it doesn't exist
        output_dir = os.path.join(os.path.dirname(__file__), '..', 'public', 'data')
        os.makedirs(output_dir, exist_ok=True)
        
        # Save to CSV
        import csv
        csv_path = os.path.join(output_dir, 'exoplanet_data.csv')
        
        if cleaned_data:
            with open(csv_path, 'w', newline='', encoding='utf-8') as csvfile:
                fieldnames = cleaned_data[0].keys()
                writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(cleaned_data)
            print(f"Data saved to: {csv_path}")
        
        # Calculate some stats
        unique_systems = len(set(planet['hostname'] for planet in cleaned_data))
        disc_years = [planet['disc_year'] for planet in cleaned_data if planet['disc_year']]
        periods = [planet['pl_orbper'] for planet in cleaned_data]
        distances = [planet['pl_orbsmax'] for planet in cleaned_data]
        
        # Save metadata/summary
        metadata = {
            'download_date': datetime.now().isoformat(),
            'total_records': len(data),
            'valid_records': len(cleaned_data),
            'unique_systems': unique_systems,
            'data_source': 'NASA Exoplanet Archive - Planetary Systems Composite Parameters',
            'api_url': base_url,
            'columns': list(cleaned_data[0].keys()) if cleaned_data else []
        }
        
        metadata_path = os.path.join(output_dir, 'metadata.json')
        with open(metadata_path, 'w') as f:
            json.dump(metadata, f, indent=2)
        print(f"Metadata saved to: {metadata_path}")
        
        # Print summary statistics
        print("\n" + "="*50)
        print("DOWNLOAD SUMMARY")
        print("="*50)
        print(f"Total records downloaded: {len(data):,}")
        print(f"Valid records after cleaning: {len(cleaned_data):,}")
        print(f"Unique star systems: {unique_systems:,}")
        if disc_years:
            print(f"Date range: {min(disc_years):.0f} - {max(disc_years):.0f}")
        print(f"Orbital periods: {min(periods):.2f} - {max(periods):.2f} days")
        print(f"Orbital distances: {min(distances):.4f} - {max(distances):.2f} AU")
        
        # Show top systems by planet count
        system_counts = {}
        for planet in cleaned_data:
            hostname = planet['hostname']
            system_counts[hostname] = system_counts.get(hostname, 0) + 1
        
        top_systems = sorted(system_counts.items(), key=lambda x: x[1], reverse=True)[:10]
        print(f"\nTop 10 systems by planet count:")
        for system, count in top_systems:
            print(f"  {system}: {count} planets")
        
        return cleaned_data
        
    except requests.exceptions.RequestException as e:
        print(f"Error downloading data: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON response: {e}")
        return None
    except Exception as e:
        print(f"Unexpected error: {e}")
        return None

def create_system_index():
    """
    Create an index of all star systems for quick lookup
    """
    try:
        import csv
        data_path = os.path.join(os.path.dirname(__file__), '..', 'public', 'data', 'exoplanet_data.csv')
        
        # Read CSV data
        planets = []
        with open(data_path, 'r', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            planets = list(reader)
        
        # Group by system
        systems = {}
        for planet in planets:
            hostname = planet['hostname']
            if hostname not in systems:
                systems[hostname] = {
                    'hostname': hostname,
                    'planet_count': 0,
                    'periods': [],
                    'distances': [],
                    'discovery_year': None,
                    'system_distance': planet.get('sy_dist'),
                    'ra': planet.get('ra'),
                    'dec': planet.get('dec')
                }
            
            systems[hostname]['planet_count'] += 1
            
            if planet.get('pl_orbper'):
                systems[hostname]['periods'].append(float(planet['pl_orbper']))
            if planet.get('pl_orbsmax'):
                systems[hostname]['distances'].append(float(planet['pl_orbsmax']))
            
            disc_year = planet.get('disc_year')
            if disc_year and (systems[hostname]['discovery_year'] is None or 
                             float(disc_year) < float(systems[hostname]['discovery_year'])):
                systems[hostname]['discovery_year'] = disc_year
        
        # Create system list with stats
        system_list = []
        for system_data in systems.values():
            periods = system_data['periods']
            distances = system_data['distances']
            
            system_list.append({
                'hostname': system_data['hostname'],
                'planet_count': system_data['planet_count'],
                'min_period': min(periods) if periods else None,
                'max_period': max(periods) if periods else None,
                'min_distance': min(distances) if distances else None,
                'max_distance': max(distances) if distances else None,
                'discovery_year': system_data['discovery_year'],
                'system_distance': system_data['system_distance'],
                'ra': system_data['ra'],
                'dec': system_data['dec']
            })
        
        # Sort by planet count (descending) then by system name
        system_list.sort(key=lambda x: (-x['planet_count'], x['hostname']))
        
        # Save system index
        index_path = os.path.join(os.path.dirname(__file__), '..', 'public', 'data', 'system_index.csv')
        
        if system_list:
            with open(index_path, 'w', newline='', encoding='utf-8') as csvfile:
                fieldnames = system_list[0].keys()
                writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(system_list)
            print(f"System index saved to: {index_path}")
        
        return system_list
        
    except Exception as e:
        print(f"Error creating system index: {e}")
        return None

if __name__ == "__main__":
    print("NASA Exoplanet Archive Data Downloader")
    print("======================================")
    
    # Download the data
    data = download_exoplanet_data()
    
    if data is not None:
        # Create system index
        systems = create_system_index()
        
        print("\n" + "="*50)
        print("DOWNLOAD COMPLETE!")
        print("="*50)
        print("Files created:")
        print("  - public/data/exoplanet_data.csv (main dataset)")
        print("  - public/data/system_index.csv (system lookup)")
        print("  - public/data/metadata.json (download info)")
        print("\nYou can now use this data in your React application!")
    else:
        print("Download failed. Please check your internet connection and try again.")
