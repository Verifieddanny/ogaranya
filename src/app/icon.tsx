import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';

export const size = {
  width: 48,
  height: 48,
};
export const contentType = 'image/png';

export default function Icon() {
  const fontData = readFileSync(
    join(process.cwd(), 'public/fonts/OGARANYA-Regular.ttf')
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#211711',
          borderRadius: '10px',
          border: '1.5px solid #FFD400',
        }}
      >
        <span
          style={{
            fontFamily: 'Ogaranya',
            fontSize: '34px',
            color: '#FFD400',
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          O
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Ogaranya',
          data: fontData,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
}
