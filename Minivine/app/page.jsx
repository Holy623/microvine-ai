
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function MicroVineAI() {
  const [prompt, setPrompt] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateVideo = async () => {
    setLoading(true);
    setVideoUrl('');
    try {
      const demoClips = [
        'https://cdn.pixabay.com/vimeo/771186906/cityscape-1280x720.mp4',
        'https://cdn.pixabay.com/vimeo/234810595/forest-1280x720.mp4',
        'https://cdn.pixabay.com/vimeo/489152144/waves-1280x720.mp4',
        'https://cdn.pixabay.com/vimeo/568866379/lightning-1280x720.mp4'
      ];
      const mockVideo = demoClips[Math.floor(Math.random() * demoClips.length)];
      await new Promise(resolve => setTimeout(resolve, 1500));
      setVideoUrl(mockVideo);
    } catch (error) {
      console.error('Error generating video:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">MicroVine AI</h1>
      <p className="mb-4 text-sm text-gray-500">Type a phrase and get a 6-second AI video loop</p>
      <Input
        placeholder="e.g. a cat breakdancing on Mars"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="mb-4"
      />
      <Button onClick={generateVideo} disabled={loading || !prompt} className="w-full">
        {loading ? <Loader2 className="animate-spin h-4 w-4" /> : 'Generate Video'}
      </Button>

      {videoUrl && (
        <Card className="mt-6">
          <CardContent>
            <video src={videoUrl} autoPlay loop muted className="rounded-xl shadow-md w-full" />
            <p className="text-xs text-gray-400 mt-2">Made with MicroVine AI</p>
            <div className="mt-2">
              <Button
                variant="ghost"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'MicroVine AI Video',
                      url: videoUrl
                    });
                  } else {
                    navigator.clipboard.writeText(videoUrl);
                    alert('Link copied to clipboard!');
                  }
                }}
              >
                Share Video
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
