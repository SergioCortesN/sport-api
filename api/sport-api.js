export default function handler(req, res) {
  // Configuración de Caché:
  // s-maxage=3600 -> Vercel guarda esto en su red por 1 hora (rápido).
  // stale-while-revalidate=59 -> Si el dato es viejo, lo actualiza en segundo plano.
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=59');

  const leagues = [
    // ==========================================
    // BASKETBALL
    // ==========================================
    {
      "leagueId": "NBA",
      "leagueName": "NBA",
      "logo": "data:image/webp;base64,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",
      "country": "USA",
      "sport": "Basketball",
      "teams": [
        "Atlanta Hawks", "Boston Celtics", "Brooklyn Nets", "Charlotte Hornets", "Chicago Bulls",
        "Cleveland Cavaliers", "Dallas Mavericks", "Denver Nuggets", "Detroit Pistons",
        "Golden State Warriors", "Houston Rockets", "Indiana Pacers", "Los Angeles Clippers",
        "Los Angeles Lakers", "Memphis Grizzlies", "Miami Heat", "Milwaukee Bucks",
        "Minnesota Timberwolves", "New Orleans Pelicans", "New York Knicks", "Oklahoma City Thunder",
        "Orlando Magic", "Philadelphia 76ers", "Phoenix Suns", "Portland Trail Blazers",
        "Sacramento Kings", "San Antonio Spurs", "Toronto Raptors", "Utah Jazz", "Washington Wizards"
      ]
    }
  ];

  // Respondemos con el JSON y estado 200 (OK)
  res.status(200).json(leagues);
}