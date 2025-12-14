async function fetchAndDisplayTopTrack(username, apiKey) {
  try {
    // Show loading state
    const container = document.getElementById('top-track-container');
    if (container) {
      container.innerHTML = '<p>Loading top track...</p>';
    }

    // Fetch data from Last.fm API
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${username}&period=7day&limit=1&api_key=${apiKey}&format=json`;
    const response = await fetch(url);
    const data = await response.json();
    
    const topTrack = data.toptracks?.track?.[0];
    
    if (!topTrack) {
      throw new Error('No track data found');
    }

    // Extract track information
    const trackInfo = {
      name: topTrack.name,
      artist: topTrack.artist.name,
      artwork: '',
      playcount: topTrack.playcount || 0
    };

    // Fetch album artwork from iTunes API (alternative source)
    trackInfo.artwork = await fetchAlbumArtwork(trackInfo.name, trackInfo.artist);
    
    console.log('Final Artwork URL:', trackInfo.artwork);

    // Display on page
    displayTrack(trackInfo);
    
  } catch (error) {
    console.error('Error fetching top weekly track:', error);
    displayError(error.message);
  }
}

/**
 * Fetches album artwork from iTunes API
 */
async function fetchAlbumArtwork(trackName, artistName) {
  try {
    const searchQuery = encodeURIComponent(`${trackName} ${artistName}`);
    const itunesUrl = `https://itunes.apple.com/search?term=${searchQuery}&entity=song&limit=1`;
    
    const response = await fetch(itunesUrl);
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      // Get high-res artwork (600x600)
      const artwork = data.results[0].artworkUrl100.replace('100x100', '600x600');
      console.log('iTunes API found artwork:', artwork);
      return artwork;
    }
    
    console.log('No artwork found on iTunes API');
    return '';
  } catch (error) {
    console.error('Error fetching artwork from iTunes:', error);
    return '';
  }
}

/**
 * Displays track information on the page
 */
function displayTrack(track) {
  const container = document.getElementById('top-track-container');
  
  if (!container) {
    console.error('Container element not found');
    return;
  }

  container.innerHTML = `
    ${track.artwork && track.artwork !== '' ? `<img src="${track.artwork}" style="width: 100px; display: inline-block;" alt="${track.name} artwork" class="track-artwork" onerror="this.style.display='none'; console.error('Image failed to load');">` : '<div style="width: 100px; height: 100px; background: #ddd; display: flex; align-items: center; justify-content: center;">No Image</div>'}
    <div style = "float: right; margin-left: 10px; margin-top: 2px; margin-bottom: 0px;">
        <p>${track.name}<br>
        by ${track.artist}<br>
        Plays this week: ${track.playcount}</p>
    </div>
  `;
}

/**
 * Displays error message on the page
 */
function displayError(message) {
  const container = document.getElementById('top-track-container');
  
  if (container) {
    container.innerHTML = `
      <div class="error-message">
        <p>Unable to load track: ${message}</p>
      </div>
    `;
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  const username = 'fractal110';
  const apiKey = '278fe27a34ffeea01b28fb53a2a0229d';
  
  fetchAndDisplayTopTrack(username, apiKey);
});
