# Tiny static file server for the guide pages (used until Node is installed).
param([string]$Root, [int]$Port = 8765)
$Root = (Resolve-Path $Root).Path
$types = @{ '.html'='text/html; charset=utf-8'; '.css'='text/css'; '.js'='text/javascript'; '.svg'='image/svg+xml'; '.png'='image/png'; '.jpg'='image/jpeg'; '.json'='application/json' }
$l = New-Object System.Net.HttpListener
$l.Prefixes.Add("http://localhost:$Port/")
$l.Start()
Write-Host "Serving $Root on http://localhost:$Port/"
while ($l.IsListening) {
  $c = $l.GetContext()
  $rel = [Uri]::UnescapeDataString($c.Request.Url.AbsolutePath.TrimStart('/'))
  if ($rel -eq '' -or $rel.EndsWith('/')) { $rel += 'index.html' }
  $path = [System.IO.Path]::GetFullPath((Join-Path $Root $rel))
  if ($path.StartsWith($Root) -and (Test-Path $path -PathType Leaf)) {
    $bytes = [System.IO.File]::ReadAllBytes($path)
    $ext = [System.IO.Path]::GetExtension($path).ToLower()
    $c.Response.ContentType = if ($types[$ext]) { $types[$ext] } else { 'application/octet-stream' }
    $c.Response.Headers.Add('Cache-Control', 'no-store')
  } else {
    $c.Response.StatusCode = 404
    $bytes = [System.Text.Encoding]::UTF8.GetBytes('Not found')
  }
  $c.Response.ContentLength64 = $bytes.Length
  $c.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  $c.Response.Close()
}
