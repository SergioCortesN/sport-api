export default function handler(req, res) {
  // Configuración de Caché:
  // s-maxage=3600 -> Vercel guarda esto en su red por 1 hora (rápido).
  // stale-while-revalidate=59 -> Si el dato es viejo, lo actualiza en segundo plano.
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=59');

  // Aquí pegas tu base de datos maestra
  const leagues = [
  {
    "leagueId": "NBA",
    "leagueName": "NBA",
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
  },
  {
    "leagueId": "NBA_G_LEAGUE",
    "leagueName": "NBA G League",
    "country": "USA",
    "sport": "Basketball",
    "teams": [
      "Austin Spurs", "Birmingham Squadron", "Capital City Go-Go", "Capitanes de Ciudad de México",
      "Cleveland Charge", "College Park Skyhawks", "Delaware Blue Coats", "Grand Rapids Gold",
      "Greensboro Swarm", "Iowa Wolves", "Long Island Nets", "Maine Celtics", "Memphis Hustle",
      "Motor City Cruise", "Oklahoma City Blue", "Osceola Magic", "Raptors 905",
      "Rio Grande Valley Vipers", "Rip City Remix", "Salt Lake City Stars", "San Diego Clippers",
      "Santa Cruz Warriors", "Sioux Falls Skyforce", "South Bay Lakers", "Stockton Kings",
      "Texas Legends", "Valley Suns", "Westchester Knicks", "Windy City Bulls", "Wisconsin Herd"
    ]
  },
  {
    "leagueId": "EUROLEAGUE",
    "leagueName": "EuroLeague",
    "country": "Europe",
    "sport": "Basketball",
    "teams": [
      "Real Madrid", "Panathinaikos AKTOR", "Olympiacos", "Fenerbahce Beko", "FC Barcelona",
      "AS Monaco", "Maccabi Playtika Tel Aviv", "Baskonia", "Virtus Segafredo Bologna",
      "Partizan Mozzart Bet", "Crvena Zvezda Meridianbet", "EA7 Emporio Armani Milan",
      "Zalgiris Kaunas", "FC Bayern Munich", "Anadolu Efes", "ALBA Berlin", "LDLC ASVEL",
      "Paris Basketball"
    ]
  },
  {
    "leagueId": "EUROCUP",
    "leagueName": "BKT EuroCup",
    "country": "Europe",
    "sport": "Basketball",
    "teams": [
      "Valencia Basket", "Hapoel Tel Aviv", "Dreamland Gran Canaria", "Joventut Badalona",
      "Besiktas Fibabanka", "Turk Telekom", "U-BT Cluj-Napoca", "Cedevita Olimpija",
      "Reyer Venezia", "Aris Midea", "Buducnost VOLI", "Lietkabelis", "Bourg-en-Bresse",
      "Bahcesehir Koleji", "Wolves Twinsbet", "Trefl Sopot", "Ratiopharm Ulm",
      "Dolomiti Energia Trento"
    ]
  },
  {
    "leagueId": "ACB",
    "leagueName": "Liga Endesa (ACB)",
    "country": "Spain",
    "sport": "Basketball",
    "teams": [
      "Real Madrid", "Unicaja", "FC Barcelona", "Valencia Basket", "Dreamland Gran Canaria",
      "UCAM Murcia", "Lenovo Tenerife", "Baskonia", "Joventut Badalona", "BAXI Manresa",
      "MoraBanc Andorra", "Casademont Zaragoza", "Surne Bilbao Basket", "Bàsquet Girona",
      "Río Breogán", "Covirán Granada", "Leyma Coruña", "Hiopos Lleida"
    ]
  },
  {
    "leagueId": "BSL",
    "leagueName": "Basketbol Süper Ligi",
    "country": "Turkey",
    "sport": "Basketball",
    "teams": [
      "Anadolu Efes", "Fenerbahce Beko", "Besiktas Fibabanka", "Pinar Karsiyaka",
      "Galatasaray Ekmas", "Manisa BBSK", "Petkim Spor", "Turk Telekom", "Bursaspor Info Yatirim",
      "Buyukcekmece", "Tofas", "Darussafaka Lassa", "Bahcesehir Koleji", "Merkezefendi Belediyesi",
      "Yalovaspor"
    ]
  },
  {
    "leagueId": "LBA",
    "leagueName": "Lega Basket Serie A",
    "country": "Italy",
    "sport": "Basketball",
    "teams": [
      "EA7 Emporio Armani Milan", "Virtus Segafredo Bologna", "Germani Brescia",
      "Umana Reyer Venezia", "Unahotels Reggio Emilia", "Dolomiti Energia Trento",
      "Estra Pistoia", "GeVi Napoli", "Bertram Derthona", "Dinamo Sassari",
      "Openjobmetis Varese", "Givova Scafati", "NutriBullet Treviso", "Vanoli Cremona",
      "Trapani Shark", "Pallacanestro Trieste"
    ]
  },
  {
    "leagueId": "LNB",
    "leagueName": "Betclic Élite",
    "country": "France",
    "sport": "Basketball",
    "teams": [
      "AS Monaco", "Paris Basketball", "LDLC ASVEL", "JL Bourg", "Nanterre 92",
      "Saint-Quentin", "Cholet Basket", "Le Mans Sarthe", "SIG Strasbourg", "Limoges CSP",
      "Elan Chalon", "BCM Gravelines-Dunkerque", "JDA Dijon", "SLUC Nancy", "Le Portel",
      "La Rochelle"
    ]
  },
  {
    "leagueId": "BBL",
    "leagueName": "EasyCredit BBL",
    "country": "Germany",
    "sport": "Basketball",
    "teams": [
      "FC Bayern Munich", "ALBA Berlin", "Niners Chemnitz", "Ratiopharm Ulm",
      "Würzburg Baskets", "Riesen Ludwigsburg", "Telekom Baskets Bonn", "EWE Baskets Oldenburg",
      "Bamberg Baskets", "Hamburg Towers", "Basketball Löwen Braunschweig", "Syntainics MBC",
      "Rostock Seawolves", "Heidelberg", "Skyliners Frankfurt"
    ]
  },
  {
    "leagueId": "ABA",
    "leagueName": "AdmiralBet ABA League",
    "country": "Adriatic (Ex-Yugo)",
    "sport": "Basketball",
    "teams": [
      "Crvena Zvezda Meridianbet", "Partizan Mozzart Bet", "Buducnost VOLI", "Cedevita Olimpija",
      "Igokea m:tel", "Zadar", "Mega MIS", "SC Derby", "Split", "Borac Mozzart",
      "FMP Soccerbet", "Cibona", "Krka", "Mornar-Barsko zlato", "Dubai BC", "Spartak Subotica"
    ]
  },
  {
    "leagueId": "NBL",
    "leagueName": "NBL",
    "country": "Australia",
    "sport": "Basketball",
    "teams": [
      "Melbourne United", "Tasmania JackJumpers", "Perth Wildcats", "Illawarra Hawks",
      "Sydney Kings", "Brisbane Bullets", "Cairns Taipans", "Adelaide 36ers",
      "South East Melbourne Phoenix", "New Zealand Breakers"
    ]
  },
  {
    "leagueId": "CBA",
    "leagueName": "CBA",
    "country": "China",
    "sport": "Basketball",
    "teams": [
      "Liaoning Flying Leopards", "Xinjiang Flying Tigers", "Zhejiang Golden Bulls",
      "Guangdong Southern Tigers", "Guangsha Lions", "Shanghai Sharks", "Shenzhen Leopards",
      "Beijing Ducks", "Shanxi Loongs", "Guangzhou Loong Lions", "Beijing Royal Fighters",
      "Qingdao Eagles", "Nanjing Monkey Kings", "Tianjin Pioneers", "Shandong Hi-Speed Kirin",
      "Jilin Northeast Tigers", "Fujian Sturgeons", "Ningbo Rockets", "Jiangsu Dragons",
      "Sichuan Blue Whales"
    ]
  },
  {
    "leagueId": "LNBP",
    "leagueName": "Liga Nacional de Baloncesto Profesional (LNBP)",
    "country": "Mexico",
    "sport": "Basketball",
    "teams": [
      "Fuerza Regia de Monterrey", "Astros de Jalisco", "Diablos Rojos del México",
      "Halcones de Xalapa", "Soles de Mexicali", "Dorados de Chihuahua", "Plateros de Fresnillo",
      "Panteras de Aguascalientes", "Abejas de León", "Correcaminos UAT", "Mineros de Zacatecas",
      "El Calor de Cancún", "Halcones Rojos de Veracruz", "Santos del Potosí",
      "Lobos Plateados de la BUAP", "Freseros de Irapuato"
    ]
  },
  {
    "leagueId": "PREMIER_LEAGUE",
    "leagueName": "Premier League",
    "country": "England",
    "sport": "Football",
    "teams": [
      "Arsenal", "Aston Villa", "Bournemouth", "Brentford", "Brighton & Hove Albion",
      "Chelsea", "Crystal Palace", "Everton", "Fulham", "Ipswich Town", "Leicester City",
      "Liverpool", "Manchester City", "Manchester United", "Newcastle United",
      "Nottingham Forest", "Southampton", "Tottenham Hotspur", "West Ham United",
      "Wolverhampton Wanderers"
    ]
  },
  {
    "leagueId": "LA_LIGA",
    "leagueName": "La Liga",
    "country": "Spain",
    "sport": "Football",
    "teams": [
      "Alavés", "Athletic Club", "Atlético Madrid", "Barcelona", "Celta Vigo", "Espanyol",
      "Getafe", "Girona", "Las Palmas", "Leganés", "Mallorca", "Osasuna", "Rayo Vallecano",
      "Real Betis", "Real Madrid", "Real Sociedad", "Real Valladolid", "Sevilla",
      "Valencia", "Villarreal"
    ]
  },
  {
    "leagueId": "SERIE_A",
    "leagueName": "Serie A",
    "country": "Italy",
    "sport": "Football",
    "teams": [
      "AC Milan", "Atalanta", "Bologna", "Cagliari", "Como", "Empoli", "Fiorentina",
      "Genoa", "Hellas Verona", "Inter Milan", "Juventus", "Lazio", "Lecce", "Monza",
      "Napoli", "Parma", "Roma", "Torino", "Udinese", "Venezia"
    ]
  },
  {
    "leagueId": "BUNDESLIGA",
    "leagueName": "Bundesliga",
    "country": "Germany",
    "sport": "Football",
    "teams": [
      "Augsburg", "Bayer Leverkusen", "Bayern Munich", "Bochum", "Borussia Dortmund",
      "Borussia Mönchengladbach", "Eintracht Frankfurt", "Freiburg", "Heidenheim",
      "Hoffenheim", "Holstein Kiel", "Mainz 05", "RB Leipzig", "St. Pauli", "Stuttgart",
      "Union Berlin", "Werder Bremen", "Wolfsburg"
    ]
  },
  {
    "leagueId": "LIGUE_1",
    "leagueName": "Ligue 1",
    "country": "France",
    "sport": "Football",
    "teams": [
      "Angers", "Auxerre", "Brest", "Le Havre", "Lens", "Lille", "Lyon", "Marseille",
      "Monaco", "Montpellier", "Nantes", "Nice", "Paris Saint-Germain", "Reims", "Rennes",
      "Saint-Étienne", "Strasbourg", "Toulouse"
    ]
  },
  {
    "leagueId": "LIGA_MX",
    "leagueName": "Liga MX",
    "country": "Mexico",
    "sport": "Football",
    "teams": [
      "América", "Atlas", "Atlético San Luis", "Cruz Azul", "Guadalajara", "Juárez",
      "León", "Mazatlán", "Monterrey", "Necaxa", "Pachuca", "Puebla", "Querétaro",
      "Santos Laguna", "Tigres UANL", "Tijuana", "Toluca", "Pumas UNAM"
    ]
  },
  {
    "leagueId": "MLS",
    "leagueName": "Major League Soccer",
    "country": "USA/Canada",
    "sport": "Football",
    "teams": [
      "Atlanta United", "Austin FC", "Charlotte FC", "Chicago Fire", "FC Cincinnati",
      "Colorado Rapids", "Columbus Crew", "D.C. United", "FC Dallas", "Houston Dynamo",
      "Inter Miami", "LA Galaxy", "Los Angeles FC", "Minnesota United", "CF Montréal",
      "Nashville SC", "New England Revolution", "New York City FC", "New York Red Bulls",
      "Orlando City", "Philadelphia Union", "Portland Timbers", "Real Salt Lake",
      "San Jose Earthquakes", "Seattle Sounders", "Sporting Kansas City", "St. Louis City",
      "Toronto FC", "Vancouver Whitecaps", "San Diego FC"
    ]
  },
  {
    "leagueId": "BRASILEIRAO",
    "leagueName": "Brasileirão Série A",
    "country": "Brazil",
    "sport": "Football",
    "teams": [
      "Athletico Paranaense", "Atlético Goianiense", "Atlético Mineiro", "Bahia",
      "Botafogo", "Corinthians", "Criciúma", "Cruzeiro", "Cuiabá", "Flamengo",
      "Fluminense", "Fortaleza", "Grêmio", "Internacional", "Juventude", "Palmeiras",
      "Red Bull Bragantino", "São Paulo", "Vasco da Gama", "Vitória"
    ]
  },
  {
    "leagueId": "ARG_PRIMERA",
    "leagueName": "Liga Profesional",
    "country": "Argentina",
    "sport": "Football",
    "teams": [
      "Argentinos Juniors", "Atlético Tucumán", "Banfield", "Barracas Central", "Belgrano",
      "Boca Juniors", "Central Córdoba", "Defensa y Justicia", "Deportivo Riestra",
      "Estudiantes de La Plata", "Gimnasia y Esgrima", "Godoy Cruz", "Huracán",
      "Independiente", "Independiente Rivadavia", "Instituto", "Lanús", "Newell's Old Boys",
      "Platense", "Racing Club", "River Plate", "Rosario Central", "San Lorenzo",
      "Sarmiento", "Talleres", "Tigre", "Unión", "Vélez Sarsfield"
    ]
  },
  {
    "leagueId": "SAUDI_PRO",
    "leagueName": "Saudi Pro League",
    "country": "Saudi Arabia",
    "sport": "Football",
    "teams": [
      "Al-Hilal", "Al-Nassr", "Al-Ahli", "Al-Ittihad", "Al-Ettifaq", "Al-Shabab",
      "Al-Taawoun", "Al-Fateh", "Al-Fayha", "Damac", "Al-Khaleej", "Al-Raed",
      "Al-Wehda", "Al-Okhdood", "Al-Riyadh", "Al-Qadsiah", "Al-Kholood", "Al-Orobah"
    ]
  },
  {
    "leagueId": "UEFA_CHAMPIONS",
    "leagueName": "UEFA Champions League",
    "country": "Europe",
    "sport": "Football",
    "teams": [
      "Real Madrid", "Manchester City", "Bayern Munich", "Paris Saint-Germain", "Liverpool",
      "Inter Milan", "Borussia Dortmund", "Barcelona", "Arsenal", "Atletico Madrid",
      "Bayer Leverkusen", "Juventus", "AC Milan", "Benfica", "Sporting CP", "RB Leipzig",
      "Atalanta", "PSV Eindhoven", "Feyenoord", "Club Brugge", "Celtic", "AS Monaco",
      "Aston Villa", "Bologna", "Girona", "Stuttgart", "Sturm Graz", "Brest", "Lille",
      "Salzburg", "Shakhtar Donetsk", "Young Boys", "Sparta Prague", "Dinamo Zagreb",
      "Red Star Belgrade", "Slovan Bratislava"
    ]
  },
  {
    "leagueId": "LIBERTADORES",
    "leagueName": "Copa Libertadores",
    "country": "South America",
    "sport": "Football",
    "teams": [
      "Fluminense", "Palmeiras", "Flamengo", "River Plate", "São Paulo", "Atlético Mineiro",
      "Botafogo", "Grêmio", "Peñarol", "Nacional", "Colo-Colo", "LDU Quito",
      "Independiente del Valle", "Bolívar", "The Strongest", "Libertad", "Cerro Porteño",
      "Universitario", "Alianza Lima", "Junior", "Millonarios", "Estudiantes", "Talleres",
      "Rosario Central", "San Lorenzo"
    ]
  },
  {
    "leagueId": "NHL",
    "leagueName": "National Hockey League",
    "country": "USA/Canada",
    "sport": "Hockey",
    "teams": [
      "Anaheim Ducks", "Boston Bruins", "Buffalo Sabres", "Calgary Flames", "Carolina Hurricanes",
      "Chicago Blackhawks", "Colorado Avalanche", "Columbus Blue Jackets", "Dallas Stars",
      "Detroit Red Wings", "Edmonton Oilers", "Florida Panthers", "Los Angeles Kings",
      "Minnesota Wild", "Montreal Canadiens", "Nashville Predators", "New Jersey Devils",
      "New York Islanders", "New York Rangers", "Ottawa Senators", "Philadelphia Flyers",
      "Pittsburgh Penguins", "San Jose Sharks", "Seattle Kraken", "St. Louis Blues",
      "Tampa Bay Lightning", "Toronto Maple Leafs", "Utah Hockey Club", "Vancouver Canucks",
      "Vegas Golden Knights", "Washington Capitals", "Winnipeg Jets"
    ]
  },
  {
    "leagueId": "KHL",
    "leagueName": "Kontinental Hockey League (KHL)",
    "country": "Russia/Eurasia",
    "sport": "Hockey",
    "teams": [
      "CSKA Moscow", "SKA St. Petersburg", "Metallurg Magnitogorsk", "Avangard Omsk",
      "Ak Bars Kazan", "Dynamo Moscow", "Lokomotiv Yaroslavl", "Salavat Yulaev Ufa",
      "Traktor Chelyabinsk", "Avtomobilist Yekaterinburg", "Sibir Novosibirsk", "Amur Khabarovsk",
      "Admiral Vladivostok", "Barys Astana", "Kunlun Red Star", "Dinamo Minsk",
      "Severstal Cherepovets", "Torpedo Nizhny Novgorod", "HC Sochi", "Vityaz Moscow Region",
      "Neftekhimik Nizhnekamsk", "Spartak Moscow", "Lada Togliatti"
    ]
  },
  {
    "leagueId": "SHL",
    "leagueName": "Swedish Hockey League (SHL)",
    "country": "Sweden",
    "sport": "Hockey",
    "teams": [
      "Färjestad BK", "Växjö Lakers", "Skellefteå AIK", "Frölunda HC", "Leksands IF",
      "Linköping HC", "Luleå HF", "Timrå IK", "Rögle BK", "Örebro HK",
      "MoDo Hockey", "Malmö Redhawks", "HV71", "Brynäs IF"
    ]
  },
  {
    "leagueId": "LIIGA",
    "leagueName": "Liiga",
    "country": "Finland",
    "sport": "Hockey",
    "teams": [
      "Tappara", "Ilves", "HIFK", "Kärpät", "Jukurit", "Pelicans", "KalPa",
      "Lukko", "TPS", "Sport", "Ässät", "KooKoo", "JYP", "HPK", "SaiPa", "Kiekko-Espoo"
    ]
  },
  {
    "leagueId": "EXTRALIGA_CZ",
    "leagueName": "Czech Extraliga",
    "country": "Czech Republic",
    "sport": "Hockey",
    "teams": [
      "HC Dynamo Pardubice", "HC Sparta Praha", "HC Oceláři Třinec", "HC Kometa Brno",
      "Bílí Tygři Liberec", "HC Verva Litvínov", "Mountfield HK", "HC Vítkovice Ridera",
      "HC Energie Karlovy Vary", "BK Mladá Boleslav", "HC Olomouc", "HC Škoda Plzeň",
      "Motor České Budějovice", "Rytíři Kladno"
    ]
  },
  {
    "leagueId": "NL_SWISS",
    "leagueName": "National League (NL)",
    "country": "Switzerland",
    "sport": "Hockey",
    "teams": [
      "ZSC Lions", "SC Bern", "HC Fribourg-Gottéron", "EV Zug", "Lausanne HC",
      "HC Lugano", "HC Davos", "Genève-Servette HC", "HC Ambrì-Piotta", "SCL Tigers",
      "EHC Biel-Bienne", "SC Rapperswil-Jona Lakers", "EHC Kloten", "HC Ajoie"
    ]
  },
  {
    "leagueId": "DEL",
    "leagueName": "Deutsche Eishockey Liga (DEL)",
    "country": "Germany",
    "sport": "Hockey",
    "teams": [
      "Eisbären Berlin", "EHC Red Bull München", "Adler Mannheim", "Kölner Haie",
      "Straubing Tigers", "Grizzlys Wolfsburg", "Schwenninger Wild Wings", "Pinguins Bremerhaven",
      "ERC Ingolstadt", "Löwen Frankfurt", "Nürnberg Ice Tigers", "Düsseldorfer EG",
      "Iserlohn Roosters", "Augsburger Panther"
    ]
  },

  // === SECCIÓN TENNIS ===
  {
  "leagueId": "ATP_WTA_INTERNATIONAL",
  "leagueName": "ATP/WTA International",
  "country": "International",
  "sport": "Tennis",
  "teams": [
    "Brisbane International",
    "Auckland Open",
    "United Cup",
    "Adelaide International",
    "Australian Open",
    "Wimbledon",
    "Roland Garros",
    "French Open",
    "US Open",
    "Indian Wells",
    "Miami Open",
    "Monte Carlo",
    "Madrid Open",
    "Rome Masters",
    "Canadian Open",
    "Cincinnati",
    "Shanghai Masters",
    "Paris Masters",
    "ATP Finals",
    "WTA Finals"
  ]
}
];

  // Respondemos con el JSON y estado 200 (OK)
  res.status(200).json(leagues);
}