import { useRef } from 'react';
import { Card, CardBody } from './Card';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
}

export default function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <Card>
      <CardBody>
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
          <video
            ref={videoRef}
            controls
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '8px'
            }}
            poster="https://placehold.co/800x450/2B2162/FFFFFF?text=Video+Player"
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <h3 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>{title}</h3>
      </CardBody>
    </Card>
  );
}
