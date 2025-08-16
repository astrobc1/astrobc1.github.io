import React, { useState, useEffect } from 'react';
import { say } from 'cowsay';

function CowSayBubble({ message }) {
  const [displayed, setDisplayed] = useState('\u00A0'); // start with a hidden space
  const [mouthOpen, setMouthOpen] = useState(false);

  useEffect(() => {
    let i = 0;
    let phase = 'typing'; // 'typing' | 'erase'
    
    const interval = setInterval(() => {
      if (phase === 'typing') {
        setDisplayed(message.slice(0, i + 1));
        setMouthOpen(true);
        i++;
        if (i > message.length) phase = 'erase';
      } else if (phase === 'erase') {
        setDisplayed('\u00A0'); // hidden char to preserve layout
        setMouthOpen(false);
        i = 0;
        phase = 'typing';
      }
    }, 350);

    return () => clearInterval(interval);
  }, [message]);

  const cowText = say({
    text: displayed.split('').reverse().join(''),
    eyes: 'oo',
    tongue: mouthOpen ? 'O' : ' ',
    wrapLength: 40,
  });

  const flippedCowText = cowText
    .split('\n')
    .map(line => line.split('').reverse().join(''))
    .join('\n');

  return (
    <pre
      style={{
        backgroundColor: 'transparent',
        padding: '1rem',
        borderRadius: '8px',
        fontFamily: 'monospace',
        whiteSpace: 'pre-wrap',
        fontSize: '0.8em',
        marginRight: '-3.8rem',
        zIndex: 2,
        position: 'relative',
      }}
    >
      {flippedCowText}
    </pre>
  );
}

export default CowSayBubble;


// import React from 'react';
// import { say } from 'cowsay';

// function CowSayBubble({ message }) {
//   const cowText = say({
//     text: message.split("").reverse().join(""),
//     eyes: 'oo',
//     tongue: '',
//     wrapLength: 40,
//   });

//   // Flip each line horizontally
//   const flippedCowText = cowText
//     .split('\n')
//     .map(line => line.split('').reverse().join(''))
//     .join('\n');

//   return (
//     <pre
//       style={{
//         backgroundColor: 'transparent',
//         padding: '1rem',
//         borderRadius: '8px',
//         fontFamily: 'monospace',
//         whiteSpace: 'pre-wrap',
//         fontSize: '0.8em',
//   marginRight: '-3.8rem',
//         zIndex: 2,
//         position: 'relative',
//       }}
//     >
//       {flippedCowText}
//     </pre>
//   );
// }

// export default CowSayBubble;
