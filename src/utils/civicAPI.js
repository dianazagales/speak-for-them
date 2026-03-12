const API_KEY = import.meta.env.VITE_GOOGLE_CIVIC_API_KEY

export async function getRepresentatives(zipCode) {
  if (!API_KEY) {
    throw new Error('Google Civic API key not configured. Add VITE_GOOGLE_CIVIC_API_KEY to your .env file.')
  }

  const url = `https://www.googleapis.com/civicinfo/v2/representatives?address=${encodeURIComponent(zipCode)}&key=${API_KEY}`

  const response = await fetch(url)
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error?.message || 'Failed to fetch representatives')
  }

  const data = await response.json()
  return parseRepresentatives(data)
}

function parseRepresentatives(data) {
  const { offices, officials } = data
  const result = {
    federal: [],
    state: []
  }

  offices.forEach(office => {
    const level = office.levels?.[0] || ''

    const reps = (office.officialIndices || []).map(idx => {
      const official = officials[idx]
      const email = official.emails?.[0] || null
      const website = official.urls?.[0] || null
      return {
        name: official.name,
        party: official.party || 'Unknown',
        office: office.name,
        email,
        website,
        photoUrl: official.photoUrl || null,
        hasEmail: !!email
      }
    })

    if (level === 'country') {
      result.federal.push(...reps)
    } else if (level === 'administrativeArea1') {
      result.state.push(...reps)
    }
  })

  return result
}
