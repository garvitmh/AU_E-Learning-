import { Video } from '../../types';
import { Card, CardBody } from './Card';

interface PlaylistProps {
  videos: Video[];
  selectedVideoId: string;
  onVideoSelect: (videoId: string) => void;
}

export default function Playlist({ videos, selectedVideoId, onVideoSelect }: PlaylistProps) {
  if (videos.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardBody>
        <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Course Playlist</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {videos.map((video, index) => (
            <div
              key={video.id || video._id}
              onClick={() => onVideoSelect((video.id || video._id) as string)}
              style={{
                padding: '1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: selectedVideoId === video.id ? '#FF464A' : '#f8f9fa',
                color: selectedVideoId === video.id ? 'white' : '#292B2E',
                transition: 'all 0.2s ease',
                border: selectedVideoId === video.id ? 'none' : '1px solid #e9ecef'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: selectedVideoId === video.id ? 'rgba(255,255,255,0.2)' : '#FF464A',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '0.9rem'
                  }}
                >
                  {index + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: selectedVideoId === video.id ? 'bold' : 'normal' }}>
                    {video.title}
                  </h4>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', opacity: 0.8 }}>
                    {video.duration}
                  </p>
                </div>
                {selectedVideoId === video.id && (
                  <div style={{ fontSize: '1.2rem' }}>▶️</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
