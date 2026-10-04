Hero background video
---------------------
Put the client's clip here as:
  public/videos/hero.mp4   (H.264, required)
  public/videos/hero.webm  (optional, smaller)

Tips: 1920x1080, 10-20 seconds, no audio, under ~8 MB. Compress with:
  ffmpeg -i input.mov -an -vf scale=1920:-2 -c:v libx264 -crf 28 -preset slow -movflags +faststart hero.mp4

Until a video is present the hero shows a slowly zooming photo instead.
