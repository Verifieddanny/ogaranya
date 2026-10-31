import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
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
          borderRadius: '38px',
          border: '4px solid #FFD400',
        }}
      >
        <span
          style={{
            fontFamily: 'Ogaranya',
            fontSize: '130px',
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
