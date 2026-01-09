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
      "logo": "data:image/png;base64,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",
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
      "logo": "aqui va tu imagen en base 64",
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
      "logo": "aqui va tu imagen en base 64",
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
      "logo": "aqui va tu imagen en base 64",
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
      "logo": "aqui va tu imagen en base 64",
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
      "logo": "aqui va tu imagen en base 64",
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
      "logo": "aqui va tu imagen en base 64",
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
      "logo": "aqui va tu imagen en base 64",
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
      "logo": "aqui va tu imagen en base 64",
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
      "logo": "aqui va tu imagen en base 64",
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
      "logo": "aqui va tu imagen en base 64",
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
      "logo": "aqui va tu imagen en base 64",
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
      "logo": "aqui va tu imagen en base 64",
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

    // ==========================================
    // FOOTBALL (SOCCER)
    // ==========================================
    {
      "leagueId": "PREMIER_LEAGUE",
      "leagueName": "Premier League",
      "logo": "aqui va tu imagen en base 64",
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
      "logo": "aqui va tu imagen en base 64",
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
      "logo": "aqui va tu imagen en base 64",
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
      "logo": "aqui va tu imagen en base 64",
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
      "logo": "aqui va tu imagen en base 64",
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
      "logo": "aqui va tu imagen en base 64",
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
      "logo": "aqui va tu imagen en base 64",
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
      "logo": "aqui va tu imagen en base 64",
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
      "logo": "aqui va tu imagen en base 64",
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
      "logo": "aqui va tu imagen en base 64",
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
      "logo": "aqui va tu imagen en base 64",
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
      "logo": "aqui va tu imagen en base 64",
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

    // ==========================================
    // HOCKEY
    // ==========================================
    {
      "leagueId": "NHL",
      "leagueName": "National Hockey League",
      "logo": "aqui va tu imagen en base 64",
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
      "logo": "aqui va tu imagen en base 64",
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
      "logo": "aqui va tu imagen en base 64",
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
      "logo": "aqui va tu imagen en base 64",
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
      "logo": "aqui va tu imagen en base 64",
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
      "logo": "aqui va tu imagen en base 64",
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
      "logo": "aqui va tu imagen en base 64",
      "country": "Germany",
      "sport": "Hockey",
      "teams": [
        "Eisbären Berlin", "EHC Red Bull München", "Adler Mannheim", "Kölner Haie",
        "Straubing Tigers", "Grizzlys Wolfsburg", "Schwenninger Wild Wings", "Pinguins Bremerhaven",
        "ERC Ingolstadt", "Löwen Frankfurt", "Nürnberg Ice Tigers", "Düsseldorfer EG",
        "Iserlohn Roosters", "Augsburger Panther"
      ]
    },

    // ==========================================
    // TENNIS
    // ==========================================
    {
      "leagueId": "GRAND_SLAM",
      "leagueName": "Grand Slam Tennis",
      "logo": "aqui va tu imagen en base 64",
      "country": "International",
      "sport": "Tennis",
      "teams": [
        "Australian Open",
        "Roland Garros",
        "French Open",
        "Wimbledon",
        "US Open"
      ]
    },
    {
      "leagueId": "ATP_WTA_MASTERS",
      "leagueName": "ATP/WTA Masters 1000 & Finals",
      "logo": "aqui va tu imagen en base 64",
      "country": "International",
      "sport": "Tennis",
      "teams": [
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
    },
    {
      "leagueId": "ATP_WTA_TOUR",
      "leagueName": "ATP/WTA World Tour",
      "logo": "aqui va tu imagen en base 64",
      "country": "International",
      "sport": "Tennis",
      "teams": [
        "Brisbane International",
        "Auckland Open",
        "Adelaide International",
        "Barcelona Open",
        "Queen's Club",
        "Halle Open",
        "Dubai Tennis Championships",
        "Acapulco",
        "Basel",
        "Vienna Open"
      ]
    },
    {
      "leagueId": "TENNIS_TEAM_CUPS",
      "leagueName": "National Team Cups",
      "logo": "aqui va tu imagen en base 64",
      "country": "International",
      "sport": "Tennis",
      "teams": [
        "United Cup",
        "Davis Cup",
        "Billie Jean King Cup",
        "Laver Cup",
        "Hopman Cup"
      ]
    },

    // ==========================================
    // BASEBALL
    // ==========================================
    {
      "leagueId": "MLB",
      "leagueName": "MLB",
      "logo": "aqui va tu imagen en base 64",
      "country": "USA",
      "sport": "Baseball",
      "teams": [
        "Arizona Diamondbacks", "Atlanta Braves", "Baltimore Orioles", "Boston Red Sox",
        "Chicago Cubs", "Chicago White Sox", "Cincinnati Reds", "Cleveland Guardians",
        "Colorado Rockies", "Detroit Tigers", "Houston Astros", "Kansas City Royals",
        "Los Angeles Angels", "Los Angeles Dodgers", "Miami Marlins", "Milwaukee Brewers",
        "Minnesota Twins", "New York Mets", "New York Yankees", "Oakland Athletics",
        "Philadelphia Phillies", "Pittsburgh Pirates", "San Diego Padres", "San Francisco Giants",
        "Seattle Mariners", "St. Louis Cardinals", "Tampa Bay Rays", "Texas Rangers",
        "Toronto Blue Jays", "Washington Nationals"
      ]
    },
    {
      "leagueId": "LMB",
      "leagueName": "Liga Mexicana de Béisbol",
      "logo": "aqui va tu imagen en base 64",
      "country": "Mexico",
      "sport": "Baseball",
      "teams": [
        "Diablos Rojos del México", "Sultanes de Monterrey", "Toros de Tijuana",
        "Tigres de Quintana Roo", "Leones de Yucatán", "El Águila de Veracruz",
        "Guerreros de Oaxaca", "Pericos de Puebla", "Olmecas de Tabasco",
        "Saraperos de Saltillo", "Acereros de Monclova", "Tecolotes de los Dos Laredos",
        "Algodoneros de Unión Laguna", "Rieleros de Aguascalientes", "Generales de Durango",
        "Bravos de León", "Piratas de Campeche", "Conspiradores de Querétaro",
        "Dorados de Chihuahua", "Charros de Jalisco (LMB)"
      ]
    },
    {
      "leagueId": "LMP",
      "leagueName": "Liga ARCO Mexicana del Pacífico",
      "logo": "aqui va tu imagen en base 64",
      "country": "Mexico",
      "sport": "Baseball",
      "teams": [
        "Naranjeros de Hermosillo", "Tomateros de Culiacán", "Charros de Jalisco",
        "Venados de Mazatlán", "Cañeros de Los Mochis", "Yaquis de Obregón",
        "Águilas de Mexicali", "Mayos de Navojoa", "Algodoneros de Guasave",
        "Sultanes de Monterrey (LMP)"
      ]
    },
    {
      "leagueId": "NPB",
      "leagueName": "NPB (Japan)",
      "logo": "aqui va tu imagen en base 64",
      "country": "Japan",
      "sport": "Baseball",
      "teams": [
        "Yomiuri Giants", "Hanshin Tigers", "Yokohama DeNA BayStars", "Hiroshima Toyo Carp",
        "Chunichi Dragons", "Tokyo Yakult Swallows", "Fukuoka SoftBank Hawks",
        "Chiba Lotte Marines", "Saitama Seibu Lions", "Tohoku Rakuten Golden Eagles",
        "Hokkaido Nippon-Ham Fighters", "Orix Buffaloes"
      ]
    },
    {
      "leagueId": "KBO",
      "leagueName": "KBO League",
      "logo": "aqui va tu imagen en base 64",
      "country": "South Korea",
      "sport": "Baseball",
      "teams": [
        "KIA Tigers", "Samsung Lions", "LG Twins", "Doosan Bears", "KT Wiz",
        "SSG Landers", "Lotte Giants", "Hanwha Eagles", "NC Dinos", "Kiwoom Heroes"
      ]
    },
    {
      "leagueId": "LIDOM",
      "leagueName": "LIDOM",
      "logo": "aqui va tu imagen en base 64",
      "country": "Dominican Republic",
      "sport": "Baseball",
      "teams": [
        "Tigres del Licey", "Águilas Cibaeñas", "Leones del Escogido",
        "Gigantes del Cibao", "Estrellas Orientales", "Toros del Este"
      ]
    },
    {
      "leagueId": "LVBP",
      "leagueName": "LVBP",
      "logo": "aqui va tu imagen en base 64",
      "country": "Venezuela",
      "sport": "Baseball",
      "teams": [
        "Leones del Caracas", "Navegantes del Magallanes", "Tiburones de La Guaira",
        "Cardenales de Lara", "Tigres de Aragua", "Águilas del Zulia",
        "Caribes de Anzoátegui", "Bravos de Margarita"
      ]
    },
    {
      "leagueId": "SERIE_DEL_CARIBE",
      "leagueName": "Serie del Caribe",
      "logo": "aqui va tu imagen en base 64",
      "country": "International",
      "sport": "Baseball",
      "teams": [
        "Mexico (Representante)", "Dominican Republic (Representante)",
        "Venezuela (Representante)", "Puerto Rico (Representante)",
        "Panama (Representante)", "Curacao (Representante)", "Nicaragua (Representante)"
      ]
    },
    {
      "leagueId": "ABL",
      "leagueName": "Australian Baseball League",
      "logo": "aqui va tu imagen en base 64",
      "country": "Australia",
      "sport": "Baseball",
      "teams": [
        "Adelaide Giants", "Brisbane Bandits", "Canberra Cavalry",
        "Melbourne Aces", "Perth Heat", "Sydney Blue Sox",
        "Auckland Tuatara"
      ]
    },
    {
      "leagueId": "CPBL",
      "leagueName": "CPBL (Taiwan)",
      "logo": "aqui va tu imagen en base 64",
      "country": "Taiwan",
      "sport": "Baseball",
      "teams": [
        "CTBC Brothers", "Fubon Guardians", "Rakuten Monkeys",
        "Uni-President 7-Eleven Lions", "Wei Chuan Dragons", "TSG Hawks"
      ]
    },

    // ==========================================
    // MOTOR SPORTS
    // ==========================================
    {
      "leagueId": "F1",
      "leagueName": "Formula 1",
      "logo": "aqui va tu imagen en base 64",
      "country": "International",
      "sport": "Motor Sports",
      "teams": [
        "Formula 1",
        "F1",
        "Grand Prix",
        "Formula 2",
        "F2",
        "Formula 3"
      ]
    },
    {
      "leagueId": "FORMULA_E",
      "leagueName": "ABB FIA Formula E",
      "logo": "aqui va tu imagen en base 64",
      "country": "International",
      "sport": "Motor Sports",
      "teams": [
        "Formula E",
        "E-Prix",
        "Mexico City E-Prix",
        "Diriyah E-Prix",
        "Sao Paulo E-Prix",
        "Tokyo E-Prix"
      ]
    },
    {
      "leagueId": "MOTOGP",
      "leagueName": "MotoGP World Championship",
      "logo": "aqui va tu imagen en base 64",
      "country": "International",
      "sport": "Motor Sports",
      "teams": [
        "MotoGP",
        "Moto2",
        "Moto3",
        "WorldSBK",
        "Superbike"
      ]
    },
    {
      "leagueId": "SUPERCROSS",
      "leagueName": "AMA Supercross / MXGP",
      "logo": "aqui va tu imagen en base 64",
      "country": "USA/Intl",
      "sport": "Motor Sports",
      "teams": [
        "Supercross",
        "AMA Supercross",
        "Motocross",
        "MXGP",
        "Pro Motocross",
        "Monster Energy Supercross"
      ]
    },
    {
      "leagueId": "NASCAR",
      "leagueName": "NASCAR",
      "logo": "aqui va tu imagen en base 64",
      "country": "USA",
      "sport": "Motor Sports",
      "teams": [
        "NASCAR",
        "Cup Series",
        "Xfinity Series",
        "Daytona 500",
        "Truck Series"
      ]
    },
    {
      "leagueId": "INDYCAR",
      "leagueName": "IndyCar Series",
      "logo": "aqui va tu imagen en base 64",
      "country": "USA",
      "sport": "Motor Sports",
      "teams": [
        "IndyCar",
        "Indy 500",
        "Indianapolis 500"
      ]
    },
    {
      "leagueId": "WRC",
      "leagueName": "World Rally Championship",
      "logo": "aqui va tu imagen en base 64",
      "country": "International",
      "sport": "Motor Sports",
      "teams": [
        "WRC",
        "Rally",
        "Dakar Rally",
        "World RX"
      ]
    },
    {
      "leagueId": "WEC",
      "leagueName": "WEC (Endurance)",
      "logo": "aqui va tu imagen en base 64",
      "country": "International",
      "sport": "Motor Sports",
      "teams": [
        "WEC",
        "24 Hours of Le Mans",
        "Le Mans",
        "Daytona 24",
        "IMSA"
      ]
    },

    // ==========================================
    // FIGHT (COMBATE)
    // ==========================================
    {
      "leagueId": "UFC",
      "leagueName": "UFC",
      "logo": "aqui va tu imagen en base 64",
      "country": "International",
      "sport": "Fight",
      "teams": [
        "UFC",
        "Ultimate Fighting Championship",
        "Dana White's Contender Series",
        "The Ultimate Fighter",
        "UFC Fight Night"
      ]
    },
    {
      "leagueId": "MMA_LEAGUES",
      "leagueName": "MMA Organizations",
      "logo": "aqui va tu imagen en base 64",
      "country": "International",
      "sport": "Fight",
      "teams": [
        "PFL",
        "Professional Fighters League",
        "Bellator",
        "ONE Championship",
        "Rizin",
        "Cage Warriors",
        "KSW",
        "LFA",
        "559 FIGHTS",
        "RAF",
        "Oktagon MMA",
        "Combate Global",
        "Invicta FC"
      ]
    },
    {
      "leagueId": "WWE",
      "leagueName": "WWE",
      "logo": "aqui va tu imagen en base 64",
      "country": "USA",
      "sport": "Fight",
      "teams": [
        "WWE",
        "Smackdown",
        "Friday Night Smackdown",
        "Raw",
        "Monday Night Raw",
        "NXT",
        "WrestleMania",
        "Royal Rumble",
        "SummerSlam",
        "Survivor Series",
        "Money in the Bank"
      ]
    },
    {
      "leagueId": "AEW",
      "leagueName": "All Elite Wrestling",
      "logo": "aqui va tu imagen en base 64",
      "country": "USA",
      "sport": "Fight",
      "teams": [
        "AEW",
        "Dynamite",
        "Rampage",
        "Collision",
        "Saturday Night Collision",
        "All In",
        "All Out",
        "Revolution",
        "Double or Nothing"
      ]
    },
    {
      "leagueId": "PRO_WRESTLING_OTHER",
      "leagueName": "Pro Wrestling (Global)",
      "logo": "aqui va tu imagen en base 64",
      "country": "International",
      "sport": "Fight",
      "teams": [
        "TNA",
        "Impact Wrestling",
        "NJPW",
        "New Japan Pro-Wrestling",
        "ROH",
        "Ring of Honor",
        "AAA",
        "Lucha Libre AAA",
        "CMLL",
        "GCW"
      ]
    },
    {
      "leagueId": "BOXING",
      "leagueName": "Boxing",
      "logo": "aqui va tu imagen en base 64",
      "country": "International",
      "sport": "Fight",
      "teams": [
        "Boxing",
        "Boxeo",
        "Top Rank",
        "Matchroom",
        "Golden Boy",
        "PBC",
        "Premier Boxing Champions",
        "Queensberry",
        "Title Fight",
        "WBC",
        "WBA",
        "IBF",
        "WBO"
      ]
    },

    // ==========================================
    // AMERICAN FOOTBALL
    // ==========================================
    {
      "leagueId": "NFL",
      "leagueName": "NFL",
      "logo": "aqui va tu imagen en base 64",
      "country": "USA",
      "sport": "American Football",
      "teams": [
        "Buffalo Bills", "Miami Dolphins", "New England Patriots", "New York Jets",
        "Baltimore Ravens", "Cincinnati Bengals", "Cleveland Browns", "Pittsburgh Steelers",
        "Houston Texans", "Indianapolis Colts", "Jacksonville Jaguars", "Tennessee Titans",
        "Denver Broncos", "Kansas City Chiefs", "Las Vegas Raiders", "Los Angeles Chargers",
        "Dallas Cowboys", "New York Giants", "Philadelphia Eagles", "Washington Commanders",
        "Chicago Bears", "Detroit Lions", "Green Bay Packers", "Minnesota Vikings",
        "Atlanta Falcons", "Carolina Panthers", "New Orleans Saints", "Tampa Bay Buccaneers",
        "Arizona Cardinals", "Los Angeles Rams", "San Francisco 49ers", "Seattle Seahawks"
      ]
    },
    {
      "leagueId": "NCAA_FOOTBALL",
      "leagueName": "NCAA College Football",
      "logo": "aqui va tu imagen en base 64",
      "country": "USA",
      "sport": "American Football",
      "teams": [
        "Alabama Crimson Tide", "Alabama",
        "Georgia Bulldogs", "Georgia",
        "Michigan Wolverines", "Michigan",
        "Ohio State Buckeyes", "Ohio State",
        "Texas Longhorns", "Texas",
        "Oregon Ducks", "Oregon",
        "Indiana Hoosiers", "Indiana",
        "Notre Dame Fighting Irish", "Notre Dame",
        "Florida State Seminoles", "Florida State",
        "LSU Tigers", "LSU",
        "Clemson Tigers", "Clemson",
        "USC Trojans", "USC",
        "Oklahoma Sooners", "Oklahoma",
        "Tennessee Volunteers", "Tennessee",
        "Penn State Nittany Lions", "Penn State",
        "Washington Huskies", "Washington",
        "Miami Hurricanes", "Miami (FL)",
        "Ole Miss Rebels", "Ole Miss",
        "Utah Utes", "Utah",
        "Colorado Buffaloes", "Colorado"
      ]
    },
    {
      "leagueId": "UFL",
      "leagueName": "UFL (United Football League)",
      "logo": "aqui va tu imagen en base 64",
      "country": "USA",
      "sport": "American Football",
      "teams": [
        "Birmingham Stallions", "Houston Roughnecks", "Memphis Showboats", "Michigan Panthers",
        "Arlington Renegades", "D.C. Defenders", "San Antonio Brahmas", "St. Louis Battlehawks"
      ]
    },
    {
      "leagueId": "CFL",
      "leagueName": "CFL (Canadian Football League)",
      "logo": "aqui va tu imagen en base 64",
      "country": "Canada",
      "sport": "American Football",
      "teams": [
        "BC Lions", "Calgary Stampeders", "Edmonton Elks", "Saskatchewan Roughriders",
        "Winnipeg Blue Bombers", "Hamilton Tiger-Cats", "Montreal Alouettes", 
        "Ottawa Redblacks", "Toronto Argonauts"
      ]
    }
  ];

  // Respondemos con el JSON y estado 200 (OK)
  res.status(200).json(leagues);
}