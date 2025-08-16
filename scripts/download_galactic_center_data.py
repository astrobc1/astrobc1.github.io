#!/usr/bin/env python3
"""
Script to download stellar data from the galactic center region
Uses multiple astronomical catalogs to get comprehensive star data
"""

import requests
import json
import csv
import os
from datetime import datetime
import time

def download_galactic_center_stars():
    """
    Download star data from the galactic center region
    """
    print("Downloading stellar data from the galactic center...")
    
    # Galactic center coordinates (Sagittarius A*)
    # RA: 17h 45m 40.04s, Dec: -29° 00' 28.1"
    center_ra = 266.417  # degrees
    center_dec = -29.0078  # degrees
    
    # Search radius in degrees (about 2 degrees = ~200 parsecs at 8 kpc)
    search_radius = 2.0
    
    # We'll query multiple catalogs and combine the data
    all_stars = []
    
    # 1. Query Gaia DR3 for high-precision stellar data
    print("Querying Gaia DR3...")
    gaia_stars = query_gaia_dr3(center_ra, center_dec, search_radius)
    if gaia_stars:
        all_stars.extend(gaia_stars)
        print(f"Found {len(gaia_stars)} stars from Gaia DR3")
    
    # 2. Query 2MASS for infrared data (better for dusty galactic center)
    print("Querying 2MASS...")
    twomass_stars = query_2mass(center_ra, center_dec, search_radius)
    if twomass_stars:
        all_stars.extend(twomass_stars)
        print(f"Found {len(twomass_stars)} stars from 2MASS")
    
    # 3. Add some known bright stars in the galactic center
    print("Adding known galactic center stars...")
    known_stars = get_known_galactic_center_stars()
    all_stars.extend(known_stars)
    
    print(f"Total stars collected: {len(all_stars)}")
    
    # Clean and deduplicate
    cleaned_stars = clean_stellar_data(all_stars)
    
    # Save to CSV
    save_stellar_data(cleaned_stars)
    
    return cleaned_stars

def query_gaia_dr3(ra, dec, radius):
    """Query Gaia DR3 catalog via TAP service"""
    try:
        # Gaia TAP service
        base_url = "https://gea.esac.esa.int/tap-server/tap/sync"
        
        # ADQL query for stars in the galactic center region
        query = f"""
        SELECT TOP 10000
            source_id,
            ra,
            dec,
            pmra,
            pmdec,
            parallax,
            phot_g_mean_mag,
            phot_bp_mean_mag,
            phot_rp_mean_mag,
            bp_rp,
            radial_velocity,
            teff_gspphot,
            logg_gspphot,
            mh_gspphot,
            distance_gspphot
        FROM gaiadr3.gaia_source
        WHERE 1=CONTAINS(
            POINT('ICRS', ra, dec),
            CIRCLE('ICRS', {ra}, {dec}, {radius})
        )
        AND phot_g_mean_mag < 20
        AND parallax > 0
        ORDER BY phot_g_mean_mag
        """
        
        params = {
            'REQUEST': 'doQuery',
            'LANG': 'ADQL',
            'FORMAT': 'json',
            'QUERY': query
        }
        
        response = requests.get(base_url, params=params, timeout=120)
        response.raise_for_status()
        
        data = response.json()
        
        if 'data' in data:
            stars = []
            columns = data['metadata']
            col_names = [col['name'] for col in columns]
            
            for row in data['data']:
                star_data = dict(zip(col_names, row))
                star_data['catalog'] = 'Gaia_DR3'
                stars.append(star_data)
            
            return stars
        
    except Exception as e:
        print(f"Error querying Gaia DR3: {e}")
    
    return []

def query_2mass(ra, dec, radius):
    """Query 2MASS catalog via IRSA"""
    try:
        # IRSA 2MASS catalog query
        base_url = "https://irsa.ipac.caltech.edu/cgi-bin/Gator/nph-query"
        
        params = {
            'outfmt': '1',  # JSON format
            'catalog': 'fp_psc',  # 2MASS Point Source Catalog
            'spatial': 'cone',
            'radius': radius * 3600,  # Convert to arcseconds
            'radunits': 'arcsec',
            'ra': ra,
            'dec': dec,
            'selcols': 'ra,dec,j_m,h_m,k_m,j_cmsig,h_cmsig,k_cmsig,ph_qual,rd_flg,bl_flg,cc_flg',
            'constraints': 'j_m < 16 AND h_m < 16 AND k_m < 16 AND ph_qual LIKE "AAA"'
        }
        
        response = requests.get(base_url, params=params, timeout=60)
        response.raise_for_status()
        
        # Parse the response (IRSA returns a specific format)
        lines = response.text.strip().split('\n')
        
        # Find the data section
        data_start = -1
        for i, line in enumerate(lines):
            if line.startswith('|ra'):
                data_start = i + 1
                break
        
        if data_start == -1:
            return []
        
        # Parse header
        header_line = lines[data_start - 1]
        headers = [h.strip('|').strip() for h in header_line.split('|') if h.strip()]
        
        stars = []
        for line in lines[data_start:]:
            if line.startswith('|') and not line.startswith('|---'):
                values = [v.strip() for v in line.split('|') if v.strip()]
                if len(values) == len(headers):
                    star_data = dict(zip(headers, values))
                    star_data['catalog'] = '2MASS'
                    stars.append(star_data)
        
        return stars[:5000]  # Limit to avoid too much data
        
    except Exception as e:
        print(f"Error querying 2MASS: {e}")
    
    return []

def get_known_galactic_center_stars():
    """Add some well-known stars in the galactic center region"""
    
    known_stars = [
        {
            'name': 'Sagittarius A*',
            'ra': 266.41683,
            'dec': -29.00781,
            'distance_pc': 8000,
            'stellar_type': 'SMBH',
            'magnitude': 15.0,
            'catalog': 'Known'
        },
        {
            'name': 'S2 (S0-2)',
            'ra': 266.41683,
            'dec': -29.00781,
            'distance_pc': 8000,
            'stellar_type': 'B0V',
            'magnitude': 14.2,
            'catalog': 'Known'
        },
        {
            'name': 'S1 (S0-1)',
            'ra': 266.41683,
            'dec': -29.00781,
            'distance_pc': 8000,
            'stellar_type': 'B0V',
            'magnitude': 15.5,
            'catalog': 'Known'
        },
        {
            'name': 'IRS 16C',
            'ra': 266.41685,
            'dec': -29.00780,
            'distance_pc': 8000,
            'stellar_type': 'WN8',
            'magnitude': 10.1,
            'catalog': 'Known'
        },
        {
            'name': 'IRS 16NW',
            'ra': 266.41681,
            'dec': -29.00779,
            'distance_pc': 8000,
            'stellar_type': 'WN8',
            'magnitude': 9.7,
            'catalog': 'Known'
        }
    ]
    
    return known_stars

def clean_stellar_data(stars):
    """Clean and standardize the stellar data"""
    
    print("Cleaning and standardizing stellar data...")
    
    cleaned_stars = []
    seen_positions = set()  # For deduplication
    
    for star in stars:
        try:
            # Extract position
            ra = float(star.get('ra', 0))
            dec = float(star.get('dec', 0))
            
            # Simple deduplication based on position
            pos_key = (round(ra, 5), round(dec, 5))
            if pos_key in seen_positions:
                continue
            seen_positions.add(pos_key)
            
            # Standardize magnitude (prefer visual, then G-band, then J-band)
            magnitude = None
            if star.get('phot_g_mean_mag'):
                magnitude = float(star['phot_g_mean_mag'])
            elif star.get('j_m'):
                magnitude = float(star['j_m'])
            elif star.get('magnitude'):
                magnitude = float(star['magnitude'])
            else:
                magnitude = 15.0  # Default for unknown
            
            # Extract distance
            distance_pc = None
            if star.get('distance_gspphot'):
                distance_pc = float(star['distance_gspphot'])
            elif star.get('parallax') and float(star['parallax']) > 0:
                distance_pc = 1000.0 / float(star['parallax'])  # Convert parallax to distance
            elif star.get('distance_pc'):
                distance_pc = float(star['distance_pc'])
            else:
                distance_pc = 8000.0  # Assume galactic center distance
            
            # Extract stellar properties
            temperature = star.get('teff_gspphot')
            if temperature:
                temperature = float(temperature)
            
            # Create standardized star record
            cleaned_star = {
                'ra': ra,
                'dec': dec,
                'magnitude': magnitude,
                'distance_pc': distance_pc,
                'temperature': temperature,
                'catalog': star.get('catalog', 'Unknown'),
                'source_id': star.get('source_id') or star.get('name', f"star_{len(cleaned_stars)}"),
                'color_bp_rp': star.get('bp_rp'),
                'proper_motion_ra': star.get('pmra'),
                'proper_motion_dec': star.get('pmdec'),
                'radial_velocity': star.get('radial_velocity'),
                'stellar_type': star.get('stellar_type'),
                'j_magnitude': star.get('j_m'),
                'h_magnitude': star.get('h_m'),
                'k_magnitude': star.get('k_m')
            }
            
            cleaned_stars.append(cleaned_star)
            
        except (ValueError, TypeError) as e:
            continue  # Skip problematic entries
    
    # Sort by magnitude (brightest first)
    cleaned_stars.sort(key=lambda x: x['magnitude'])
    
    print(f"Cleaned dataset: {len(cleaned_stars)} unique stars")
    
    return cleaned_stars

def save_stellar_data(stars):
    """Save stellar data to CSV files"""
    
    # Create output directory
    output_dir = os.path.join(os.path.dirname(__file__), '..', 'public', 'data')
    os.makedirs(output_dir, exist_ok=True)
    
    # Save main dataset
    csv_path = os.path.join(output_dir, 'galactic_center_stars.csv')
    
    if stars:
        with open(csv_path, 'w', newline='', encoding='utf-8') as csvfile:
            fieldnames = stars[0].keys()
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(stars)
        print(f"Stellar data saved to: {csv_path}")
    
    # Create subsets for different visualizations
    
    # Bright stars (for main visualization)
    bright_stars = [s for s in stars if s['magnitude'] < 12]
    bright_path = os.path.join(output_dir, 'galactic_center_bright_stars.csv')
    
    if bright_stars:
        with open(bright_path, 'w', newline='', encoding='utf-8') as csvfile:
            fieldnames = bright_stars[0].keys()
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(bright_stars)
        print(f"Bright stars saved to: {bright_path}")
    
    # Save metadata
    metadata = {
        'download_date': datetime.now().isoformat(),
        'total_stars': len(stars),
        'bright_stars': len(bright_stars),
        'magnitude_range': [min(s['magnitude'] for s in stars), max(s['magnitude'] for s in stars)],
        'catalogs_used': list(set(s['catalog'] for s in stars)),
        'galactic_center_coords': {'ra': 266.417, 'dec': -29.0078},
        'search_radius_deg': 2.0,
        'data_source': 'Gaia DR3, 2MASS, Known galactic center objects'
    }
    
    metadata_path = os.path.join(output_dir, 'galactic_center_metadata.json')
    with open(metadata_path, 'w') as f:
        json.dump(metadata, f, indent=2)
    print(f"Metadata saved to: {metadata_path}")
    
    # Print summary
    print("\n" + "="*60)
    print("GALACTIC CENTER STELLAR DATA DOWNLOAD COMPLETE")
    print("="*60)
    print(f"Total stars: {len(stars):,}")
    print(f"Bright stars (mag < 12): {len(bright_stars):,}")
    
    if stars:
        print(f"Magnitude range: {min(s['magnitude'] for s in stars):.1f} - {max(s['magnitude'] for s in stars):.1f}")
        
        # Catalog breakdown
        catalogs = {}
        for star in stars:
            cat = star['catalog']
            catalogs[cat] = catalogs.get(cat, 0) + 1
        
        print("\nCatalog breakdown:")
        for cat, count in catalogs.items():
            print(f"  {cat}: {count:,} stars")

if __name__ == "__main__":
    print("Galactic Center Stellar Data Downloader")
    print("=======================================")
    print("This will download stellar data from the center of the Milky Way")
    print("Including data from Gaia DR3, 2MASS, and known galactic center objects")
    print()
    
    try:
        stars = download_galactic_center_stars()
        
        if stars:
            print("\n" + "="*60)
            print("SUCCESS!")
            print("="*60)
            print("Files created:")
            print("  - public/data/galactic_center_stars.csv (complete dataset)")
            print("  - public/data/galactic_center_bright_stars.csv (bright stars only)")
            print("  - public/data/galactic_center_metadata.json (download info)")
            print("\nYou can now create a 3D visualization of the galactic center!")
        else:
            print("No stellar data was downloaded.")
            
    except KeyboardInterrupt:
        print("\nDownload interrupted by user.")
    except Exception as e:
        print(f"Error during download: {e}")
