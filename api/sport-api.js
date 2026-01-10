export default function handler(req, res) {
  // Configuración de Caché:
  // s-maxage=3600 -> Vercel guarda esto en su red por 1 hora (rápido).
  // stale-while-revalidate=59 -> Si el dato es viejo, lo actualiza en segundo plano.
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=59');

  const leagues = [
    // ==========================================
    // TORNEOS INTERNACIONALES (PRIORIDAD ALTA)
    // ==========================================
    {
      "leagueId": "EURO_LEAGUE",
      "leagueName": "Turkish Airlines EuroLeague",
      "logo": "data:image/webp;base64,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",
      "country": "Europe",
      "sport": "Basketball",
      "keywords": ["EuroLeague", "Euro League", "Turkish Airlines", "Euroleague"], 
      "teams": [
        "Hapoel Tel Aviv", "Hapoel TA",
        "AS Monaco", "Monaco Basket",
        "Valencia Basket", "Valencia",
        "FC Barcelona", "Barça",
        "Fenerbahçe Beko", "Fenerbahçe",
        "Real Madrid",
        "Panathinaikos AKTOR", "Panathinaikos",
        "Olympiacos Piraeus", "Olympiacos",
        "Žalgiris Kaunas", "Žalgiris",
        "Crvena Zvezda Meridianbet", "Crvena zvezda", "Red Star",
        "EA7 Emporio Armani Milan", "EA7 Milano", "Olimpia Milano",
        "Virtus Segafredo Bologna", "V. Bologna", "Virtus Bologna",
        "BC Dubai", "Dubai",
        "Maccabi Playtika Tel Aviv", "Maccabi Tel-Aviv", "Maccabi",
        "Paris Basketball", "Paris",
        "Baskonia Vitoria-Gasteiz", "Baskonia",
        "FC Bayern Munich", "Bayern",
        "Anadolu Efes Istanbul", "Anadolu Efes",
        "LDLC ASVEL", "ASVEL",
        "Partizan Mozzart Bet", "Partizan"
      ]
    },

    // ==========================================
    // LIGAS NACIONALES (BASKETBALL)
    // ==========================================
    {
      "leagueId": "NBA",
      "leagueName": "NBA",
      "logo": "data:image/webp;base64,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",
      "country": "USA",
      "sport": "Basketball",
      "keywords": [],
      "teams": [
        "Atlanta Hawks", "Boston Celtics", "Brooklyn Nets", "Charlotte Hornets", "Chicago Bulls",
        "Cleveland Cavaliers", "Dallas Mavericks", "Denver Nuggets", "Detroit Pistons",
        "Golden State Warriors", "Houston Rockets", "Indiana Pacers", "Los Angeles Clippers",
        "Los Angeles Lakers", "Memphis Grizzlies", "Miami Heat", "Milwaukee Bucks",
        "Minnesota Timberwolves", "New Orleans Pelicans", "New York Knicks", "Oklahoma City Thunder",
        "Orlando Magic", "Philadelphia 76ers", "Phoenix Suns", "Portland Trail Blazers",
        "Sacramento Kings", "San Antonio Spurs", "Toronto Raptors", "Utah Jazz", "Washington Wizards"
      ]
    },
    {
      "leagueId": "WNBA",
      "leagueName": "WNBA",
      "logo": "data:image/webp;base64,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",
      "country": "USA",
      "sport": "Basketball",
      "keywords": [],
      "teams": [
        "Atlanta Dream", "Chicago Sky", "Connecticut Sun", "Dallas Wings", "Indiana Fever",
        "Las Vegas Aces", "Los Angeles Sparks", "Minnesota Lynx", "New York Liberty",
        "Phoenix Mercury", "Seattle Storm", "Washington Mystics", "Golden State Valkyries"
      ]
    }, 
    {
      "leagueId": "NBAGL",
      "leagueName": "NBA G League",
      "logo": "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",
      "country": "USA",
      "sport": "Basketball",
      "keywords": [],
      "teams": [
        "Austin Spurs", "Birmingham Squadron", "Capital City Go-Go", "Cleveland Charge", "College Park Skyhawks",
        "Delaware Blue Coats", "Grand Rapids Gold", "Greensboro Swarm", "Iowa Wolves", "Long Island Nets", "Maine Celtics",
        "Memphis Hustle", "Capitanes CDMX", "Motor City Cruise", "Indiana Mad Ants", "Oklahoma City Blue", "Osceola Magic",
        "Raptors 905", "Rio Grande Valley Vipers", "Salt Lake City Stars", "Ontario Clippers", "Santa Cruz Warriors", "Sioux Falls Skyforce",
        "South Bay Lakers", "Stockton Kings", "Texas Legends", "Westchester Knicks", "Valley Vipers", "Wisconsin Herd", "Windy City Bulls"
      ]
    },
    {
      "leagueId": "ACB",
      "leagueName": "Liga Endesa (ACB)",
      "logo": "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",
      "country": "Spain",
      "sport": "Basketball",
      "keywords": [],
      "teams": [
        "Baskonia Vitoria-Gasteiz", "Baskonia",
        "Basquet Girona",
        "BAXI Manresa", "Manresa",
        "Casademont Zaragoza", "Zaragoza",
        "Coviran Granada", "Granada",
        "Dreamland Gran Canaria", "Gran Canaria",
        "FC Barcelona", "Barça",
        "Hiopos Lleida", "Lleida",
        "Joventut Badalona", "Joventut",
        "La Laguna Tenerife", "Tenerife",
        "MoraBanc Andorra", "Andorra",
        "Real Madrid",
        "Rio Breogan", "Breogan",
        "San Pablo Burgos", "Burgos",
        "Surne Bilbao", "Bilbao Basket",
        "UCAM Murcia", "Murcia",
        "Unicaja Malaga", "Unicaja",
        "Valencia Basket", "Valencia"
      ]
    },
    {
      "leagueId": "BSL",
      "leagueName": "Basketbol Süper Ligi",
      "logo": "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",
      "country": "Turkey",
      "sport": "Basketball",
      "keywords": [],
      "teams": [
        "Aliaga Petkim Spor", "Petkim Spor",
        "Anadolu Efes Istanbul", "Anadolu Efes",
        "Bahcesehir Koleji",
        "Besiktas S.J.", "Besiktas",
        "Bursaspor",
        "Buyukcekmece",
        "Esenler Erokspor",
        "Fenerbahce BEKO", "Fenerbahce",
        "Galatasaray",
        "Manisa BBSK",
        "Merkezefendi",
        "Mersin BBGSK", "Mersin",
        "Pinar Karsiyaka", "Karsiyaka",
        "Tofas Bursa", "Tofas",
        "Trabzonspor",
        "Turk Telekom"
      ]
    },
    {
      "leagueId": "LBA",
      "leagueName": "Lega Basket Serie A",
      "logo": "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",
      "country": "Italy",
      "sport": "Basketball",
      "keywords": [],
      "teams": [
        "Acqua S. Bernardo Cantù", "Cantù",
        "Apu Udine", "Udine",
        "Bertram Derthona", "Tortona",
        "Dinamo Sassari", "Sassari",
        "Dolomiti Energia Trento", "Trentino", "Trento",
        "EA7 Emporio Armani Milan", "EA7 Milano", "Olimpia Milano", "Milano",
        "Germani Brescia", "Brescia",
        "GeVi Napoli", "Napoli Basket", "Napoli",
        "Nutribullet Treviso", "Treviso Basket", "Treviso",
        "Pallacanestro Trieste", "Trieste",
        "Openjobmetis Varese", "Varese",
        "Pall. Trapani", "Trapani Shark", "Trapani",
        "Umana Reyer Venezia", "Reyer Venezia", "Venezia",
        "Unahotels Reggio Emilia", "Reggio Emilia",
        "Vanoli Cremona", "Cremona",
        "Virtus Segafredo Bologna", "Segafredo Bologna", "Virtus Bologna",
        "Estra Pistoia", "Pistoia",
        "Givova Scafati", "Scafati"
      ]
    },
    {
      "leagueId": "LNB",
      "leagueName": "Betclic Élite",
      "logo": "data:image/webp;base64,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",
      "country": "France",
      "sport": "Basketball",
      "keywords": [],
      "teams": [
        "AS Monaco", "Monaco",
        "Boulazac", "Boulazac Basket Dordogne",
        "Bourg-en-Bresse", "JL Bourg", "Bourg",
        "Elan Chalon", "Chalon",
        "Cholet Basket", "Cholet",
        "JDA Dijon", "Dijon",
        "Gravelines-Dunkerque", "BCM Gravelines-Dunkerque", "Gravelines",
        "LDLC ASVEL", "ASVEL", "Villeurbanne",
        "Le Mans", "Le Mans Sarthe",
        "ESSM Le Portel", "Le Portel",
        "Limoges CSP", "Limoges",
        "SLUC Nancy", "Nancy",
        "Nanterre 92", "Nanterre",
        "Paris Basketball", "Paris",
        "Saint-Quentin",
        "Strasbourg", "SIG Strasbourg", "SIG"
      ]
    },
    {
      "leagueId": "BBL",
      "leagueName": "EasyCredit BBL",
      "logo": "data:image/webp;base64,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",
      "country": "Germany",
      "sport": "Basketball",
      "keywords": [],
      "teams": [
        "ALBA Berlin", "ALBA", "Berlin",
        "Bamberg Baskets", "Bamberg",
        "Basketball Löwen Braunschweig", "Braunschweig",
        "Telekom Baskets Bonn", "Bonn",
        "Niners Chemnitz", "Chemnitz",
        "Skyliners Frankfurt", "Frankfurt", "Skyliners",
        "Hamburg Towers", "Hamburg",
        "Heidelberg", "MLP Academics Heidelberg",
        "Jena", "Science City Jena",
        "Riesen Ludwigsburg", "Ludwigsburg",
        "FC Bayern Munich", "Bayern", "Bayern Munich",
        "EWE Baskets Oldenburg", "Oldenburg",
        "Rostock Seawolves", "Rostock",
        "Syntainics MBC", "Mitteldeutscher", "MBC",
        "Trier", "Gladiators Trier",
        "Ratiopharm Ulm", "Ulm",
        "Rasta Vechta", "Vechta",
        "Würzburg Baskets", "Würzburg"
      ]
    }
  ];

  // Respondemos con el JSON y estado 200 (OK)
  res.status(200).json(leagues);
}