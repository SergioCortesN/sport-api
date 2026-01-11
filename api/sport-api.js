export default function handler(req, res) {
  // Configuración de Caché:
  // s-maxage=3600 -> Vercel guarda esto en su red por 1 hora (rápido).
  // stale-while-revalidate=59 -> Si el dato es viejo, lo actualiza en segundo plano.
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=59');

  const leagues = [
    // ==========================================
    // BASKETBALL TOURNAMENTS
    // ==========================================
    {
      "leagueId": "EURO_LEAGUE",
      "leagueName": "Turkish Airlines EuroLeague",
      "logo": "data:image/webp;base64,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",
      "country": "Europe",
      "sport": "Basketball",
      "keywords": ["EuroLeague", "Euro League", "Turkish Airlines", "Euroleague"], 
      "teams": [
        "Anadolu Efes Istanbul",
        "AS Monaco",
        "Crvena Zvezda Meridianbet Belgrade",
        "Dubai Basketball",
        "EA7 Emporio Armani Milan",
        "FC Barcelona",
        "FC Bayern Munich",
        "Fenerbahçe Beko Istanbul",
        "Hapoel IBI Tel Aviv",
        "Kosner Baskonia Vitoria-Gasteiz",
        "LDLC ASVEL Villeurbanne",
        "Maccabi Rapyd Tel Aviv",
        "Olympiacos Piraeus",
        "Panathinaikos AKTOR Athens",
        "Paris Basketball",
        "Partizan Mozzart Bet Belgrade",
        "Real Madrid",
        "Valencia Basket",
        "Virtus Bologna",
        "Zalgiris Kaunas"
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
      "logo": "data:image/webp;base64,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",
      "country": "USA",
      "sport": "Basketball",
      "keywords": [],
      "teams": [
        "Austin Spurs",
        "Birmingham Squadron",
        "Delaware Blue Coats",
        "Capital City Go-Go",
        "Mexico City Capitanes",
        "Cleveland Charge",
        "College Park Skyhawks",
        "Motor City Cruise",
        "Noblesville Mad Ants",
        "Grand Rapids Gold",
        "Greensboro Swarm",
        "Iowa Wolves",
        "Long Island Nets",
        "Maine Celtics",
        "Memphis Hustle",
        "Oklahoma City Blue",
        "Osceola Magic",
        "Raptors 905",
        "Rio Grande Valley Vipers",
        "Rip City Remix",
        "Salt Lake City Stars",
        "San Diego Clippers",
        "Santa Cruz Warriors",
        "Sioux Falls Skyforce",
        "South Bay Lakers",
        "Stockton Kings",
        "Texas Legends",
        "Valley Suns",
        "Westchester Knicks",
        "Windy City Bulls",
        "Wisconsin Herd"
      ]
    },
    {
      "leagueId": "ACB",
      "leagueName": "Liga Endesa (ACB)",
      "logo": "data:image/webp;base64,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",
      "country": "Spain",
      "sport": "Basketball",
      "keywords": [],
      "teams": [
        "Real Madrid",
        "Valencia Basket",
        "UCAM Murcia",
        "FC Barcelona",
        "La Laguna Tenerife",
        "Joventut Badalona",
        "Kosner Baskonia",
        "Unicaja",
        "Dreamland Gran Canaria",
        "Rio Breogán",
        "Surne Bilbao",
        "Bàsquet Girona",
        "Casademont Zaragoza",
        "Baxi Manresa",
        "Hiopos Lleida",
        "MoracBanc Andorra",
        "Recoletas Salud San Pablo Burgos",
        "Coviran Granada"
      ]
    },
    {
      "leagueId": "BSL",
      "leagueName": "Basketbol Süper Ligi",
      "logo": "data:image/webp;base64,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",
      "country": "Turkey",
      "sport": "Basketball",
      "keywords": [],
      "teams": [
        "Ganancia de Beşiktaş",
        "Fenerbahçe Beko",
        "Colegio Bahçeşehir",
        "Safiport Erokspor",
        "Telekom Turco",
        "Trabzonspor",
        "Técnica del MCT de Galatasaray",
        "Éfeso Anatolio",
        "Tofaş",
        "Yukatel Merkezefendi Belediye Basket",
        "Bursaspor Basketbol",
        "Aliağa Petkim Spor",
        "Mersin Spor",
        "Glint Manisa Basket",
        "Karşıyaka",
        "Onvo Büyükçekmece Basketbol"
      ]
    },
    {
      "leagueId": "LBA",
      "leagueName": "Lega Basket Serie A",
      "logo": "data:image/webp;base64,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",
      "country": "Italy",
      "sport": "Basketball",
      "keywords": [],
      "teams": [
        "Acqua S. Bernardo Cantù",
        "Apu Old Wild West Udine",
        "Banco di Sardegna Sassari",
        "Bertram Derthona Tortona",
        "Dolomiti Energia Trento",
        "EA7 Emporio Armani Milano",
        "Germani Brescia",
        "Guerri Napoli",
        "NutriBullet Treviso Basket",
        "Openjobmetis Varese",
        "Pallacanestro Trieste",
        "Trapani Sharks",
        "Umana Reyer Venezia",
        "Una Hotels Reggio Emilia",
        "Vanoli Basket Cremona",
        "Virtus Olidata Bologna"
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
        "Monaco",
        "Bourg-en-Bresse",
        "Nanterre",
        "Paris",
        "Lyon-Villeurbanne",
        "Strasbourg",
        "Le Mans",
        "Chalon/Saône",
        "Dijon",
        "Nancy",
        "Boulazac",
        "Limoges",
        "Gravelines-Dunkerque",
        "Saint-Quentin",
        "Le Portel"
      ]
    },
    {
      "leagueId": "BBL",
      "leagueName": "EasyCredit BBL",
      "logo": "data:image/webp;base64,UklGRpgNAABXRUJQVlA4TIsNAAAvT8ATEGJg0LaRpDT8Wd98qyMQERNAn4RtylnaGU3+IFSMhA9zBVgoUqZzOqABtaMqB0BDr7iLw4FDTpwgRXhIV9o2RXbTkmxHznwDv+vMzLaZmdrMzDz3fxfbPbt2/3MDv1gyM206ZWbM8ICZmcUyM4qpy8wMYojNLFxKTo2SrV6jmKWQpQRSG0mCJGdOnQ7CfZvFfQtKQxloAw2atW1nnGfKbSSZhXTw5c0T/Kht27Ztu29tLKFLg1XbdtzGdsygBATFJDp+CYqgCIoABMQDkfU6vZXNwG0jRen25pgXnyBV/j9FclaFJHMyj3CP0PLkypMjT6482WFmZgaZR8iz9YzKExzoq7wBHfgwbOUfZjgIMzN0VUZdtZ0wM6qcTtWMTUVt1W5cRnZVqNVVtZoTfxEGJ7W1R05YbURKBBRVwV4H+xopv4RK+GFh4cAPDvzhLDnnwY1kW3UsbMQsHfOZxxSzluEsM4TwGUWSFAkNOMMBUpBwCppYHecTF6nIbSMlnWW4DbyBjvv/cWPnHSXllHMElVO+MqWO4qP4CDmCjzLHyDJ4Rkja7wz7e7Wy2T3x1m7a6aKsBLPJnct5O9VpJmsb/LMJEDAHSLpxl31flF1QF7iiS+EHzMxzZahS2JlVbVtRjjOfRrhRXpQX5UUhClFeDAdQNgHYSLGClBtvrIRI4YcRCZGAhEhAQmXwp/8O3EZSpPb1De3A8b2BNMWKgwU3qiO2LfGX/bLkf+5r3VV/Nzz2rqb3/tf42TlNn73T7DS8G24HUX857HVyt9RYtHMk1VI2C04WHBSmGJxE7OBiiwkXAS8YjpRhsEn+nraIaHaoZgcNLqaNLVxQAREc4khzyUv7ShBI9QeDFl5icBCxRY/z4oMOzz8vpCIGh/zl40fikpeS1rKDTgx2Fuyh0IboXZDK+/iRSIQwMaGUKXMcNhFKykihEYWShtIftllUApEMCQDSKDDdwEnv5KMIVCBhMYnBEcoRcDGkd/o+fIuTCjDDzgJx08QMHP+jI4PAPkOzQzBbXHHDj+kSP6MXMwQ26lsUi4XFBksiKFINfN9xJXHE9rIwTmYYv/iY3on/yoziLG4ja2zDrME8LzeGgSJrs0yJ1y1bRCjrDu1kLXMoYmG4b9s2pMMUU9YwRcNQ6hAc6XaIx+CvesZG1jKjyM3CcJ9p9mgUQdnqxJbrlpR4SAx6YyjU8zFbWIQejUJNfdwZ7eVqca6HVKa+ad6LrV5cmN2NrU5stWtLtE15uFJpIyOSMObCMfLvn42bheDFso2xofAoU0gVihL6LB/EhX5c+FHQqW0tLckKQzBlxBBXbkrCxUJe/DwWO6szQo7neiV4lqyN76MenA8jBnHjR6921GnYqipJJs0wkCuJEASL+hEirDjpMrnsVyS9KsoWpx77OLXYx/ko3j0bRBTMliWehUuEa1Pz4zpiOxPbiQ1OYoue/+gA4NqS2XyUKts4N9dBPaYQo/jHmd4iIoC7kQjEEQQ2DB2qD5N1BnMwLEZMHEKYshDRxmT+jVKYNahXpk+nirNnKytDJqVFwAh+Yc3djxpKxFhbv36M1SgaY5P+xi0mDf/ecGrx4cM+S4opHknQWl/IDgb166cOGPqvjolAfffp8mm0aOFTwGpwMcQHjrWoNIp9s5jEv/9vCrlNtoV8ZFsUQH2ARAwYABILWJ1IJ5EwP33/DvH9OfXUQ0CiydU+u8J+GYUxJvFuEt/+l/8fxbNRvEvMnl3yOmmG2bbTDLbcTqgH8j36KEgwIDG1co9QPw6pPHU/X8qnHgIS13mSVxXPkZMa4fRt/Eh+fv443mleUNCJLduzW8RgdeygAesC9R7lIhxFHH8MSAyNH6zg0zj11PL+vkkuZwdbLJhbHo8NhtRiI9/HR7VnehTv9DDi2YaCbm2r07BVcikJoCzGELCGhDfwLcd6dMDBPzv1OERaIcyvQL7MCDGHwlqe3ccTicSzxIZeHB3r1JZKXqMpc42CSEJcBwFcLAKJZSLeQKKBDt9GhrEumq3HWfv5ep56CLC2XmxZXXH8Oe77tg97EQU/fhTMPtaJrRJEqbfJODHIuewvE/FGzw4oCIVQ39ViMlhR998+Kps9e/ax2SywIeh9IQj5fIcxYwhY/cZHkxM8fBqUUQVbRshV/LdtW4idmHLdqiqr/cOoJAxscTe4jIJ4my5DspqpvgrhrVvfbGHcw1D/gzAqcaR4PYZFkDwak/181aktCqPzDZlFQ+CWWomxwbzcJBKH/malGWHPWyARwdiBl/TpKQbJalpVhLBRu1Bc/BxcHULop3fyvI1ft8/QKLMAkZ4pBK+18g1lVRjGb8FVIDL1CKIhvs8S/5jYHkkPmKh3wIn6cBB36BFsSDgriQNMwdUbwZqRn4gxNobFpCYm4o0qaDxm/VTKBNtNrpK2KudjnpDWPqPOwEXFG0k0gEbadDmxgwYXK47tGCs+eP7vDn83bHgtJdUDnxNI9Bsf5VgpRiF9EnQBq9FlD9i8+CAfUBxIoxCLiLEaSKwbV5YvSjoErs/YhEMGZejz0XAx74AXIfXAHywVnBpV/8Ysl693SkSkdx85UzU9Q0Tz5hHR+wKSqsipv7J6K8v/Ucalfyev+JSgUSXUT6kuwnwI84r1hwxZWTnpRENBo1PmTjm1ci+qsrJSUEUpod+QtdUb8uPyiimHQvkAX05lni3v581nu1E7ObeTfY2Lm5kvYbqEcZPW1m1t7VZXb2XVllcuXbThIZRyjeEzKplLp+7lzfCdXNvJscbbWbeVZZuZZ4Vh6+tXvbpm5/y4vHwqpodj6TO7xMwuhb7UDnVqFm1XGIbH4fzcuTXWtXVco7UHBx5gfSctvfgQmF0KszC8FLZM3XT3N4D1tC9l81JwcKD1pF95YKrBsiUVQRGe2kOn5RfjogjCMFpvmbRcUeQBT22nqh3U3z3F+k5SasMTyRidyAhJ9sUX2RgtY4SoXdVyJjgVoSL+EeqfXbwQBgWKdiSCAl98AYQFj9w3agXfWnSaUv3VV+/t7AhzGD4sDP57KI7hfg5fGiMJkZfl/QC+2vtYz8QfJhup5W+l3JGSVX6SUnolBMbIh0U2xDj7Iszub+7nEYtdIBLLb7+NVkqM5GilVH4pEfEhZ1gIu+znyTA8BQz3i/0i8UWVq13tAeydWiXkWWZ9G0URcXIkyTO0gr7BvINyoowvBMHW/WWeV/ESFU3+GX0q5Wi1BFlVq5a3xAzSgXGYQs5HZQQUSZQjpX+EJ4MYs1cbe4yiFNW+t7V5BzGfZ1lWtlxISg/o0sZVTIP0BpEn2Mph6W44CxPz7nfwyqEPw/m8TLBZemd7qoKBXaJBSgYwsA0sNvoLRdvSG0JkL08+m9fYpz5E+XjoCJG2ULUxFpZy3DCGFGrTKnsPHuXXP9vNtXmNi49jV2udw00VmqZJG7hjNI3wmTKGHEb2Hu/x3NMbqR1RfvjI3ah5OznWuHg7TBRV3bTRNEBaV9SuxFIhvwFLCGLjoCTeCM4UTjvH9yUYt7OtXbEyCCoTsdkpkJNroPJ0YGJK0Rg58SpQmF16kP3Dz6ZNa7zGdvvN8hSjNQl/+Ykk9ZJEQukR2gtC+lAkft0+PxGHHDEjKVcJOsXyJ/kKyw9r9RFyjCAgk1enDg70EkakahqRMwaW5EU2KqND4FCgD6Unpwz6uEEUCytts1TRqcAhALrpxBiDjf5fR6xjXIcRjvHwdcIQWSzgSPLMdHIjELAiBjt4VDIVHr5eWKqwcb3wDcQoNremBjAkeXlPp04tcGi58Drul7dLD/hqWVSkAEN0l6YVXocjAyzFdq0X4VbgcHcIYKssPbW7OQBHCdCQcy42QEM1FrA8hBJpkuBE/4WJAExMDgCMERbLHQ34s85DRQxmn38YdtMsuI3+L1ARxbje/QzuXQSOSAGBcGVGRhQuhV+w7KbFu+uopikWMEyAPs+68IVW28mtQCIbY4HNkokDwFAjXKk1WbaQIgApi2w2uqkFCpfCrACC8rPyoNRLYM8J76PVEndXCSlsVONd3KBT25xKR2vz4Tw0QPEAbemBU/oPAyQOCwymxNxgd3aAjW54KlMSKEq6+N6E2RZOfEYeMYp/EG/cwOtQ1tp0ibOA4/PU+5yyMjkRTg1dXg+zL7BYoNdyqvBuv2MMyGCBHo1pdVNJl8rX51knhDR6fKwhg17r6SamGv1Y06oUabMXNc+27k+98MILY2a+Kq7jXs4RkYv7mW9uKjl16TJNttFLrv4prfWj2Tv4RFao1I+UkvpzhkpXa8FknIqa/88dZ7291czbbKYJ4yY9P5lMslykN29khTrithkp2b9CuS2w/eQMHe3EpQdRwacxbV6Xn9v1EabZw1UXItDD+ZajVL0g7cXTjA8pRUffJOVUfOXUiKQHaI0jVTY+qC7ErG+VXghI8es9SrWdbgqoVCo5TPU2i2i2xtC5UD8ri+1eKtpJ1dVDfvzxeI40BChVapxrqM44HAu2xMOvzWbmvmVXHpuYSWE8NzCY6+nJtbTn6hpzFdW5grJcVkEmEqbXIIPy6qdXppIXphs/3XjpRrK9+3gp5T6Sbty8zqlkRSWlKuJmRUxW1M3+7o88lv7Nuy/1E/+q09hG/6aFAAA=",
      "country": "Germany",
      "sport": "Basketball",
      "keywords": [],
      "teams": [
        "ALBA Berlin",
        "Brose Bamberg",
        "Braunschweig",
        "EWE Baskets Oldenburg",
        "FC Bayern München",
        "Skyliners Frankfurt",
        "Hamburg Towers",
        "Ludwigsburg",
        "Heidelberg",
        "Niners Chemnitz",
        "Rasta Vechta",
        "ratiopharm Ulm",
        "Rostock Seawolves",
        "S.C. Jena",
        "Syntainics MBC",
        "Telekom Baskets Bonn",
        "Gladiators Trier",
        "Würzburg"
      ]
    },
    //=====================================================
    // FOOTBALL TOURNAMENTS
    //=====================================================
    {
      "leagueId": "UEFA_CHAMPIONS",
      "leagueName": "UEFA Champions League",
      "logo": "data:image/webp;base64,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",
      "country": "Europe",
      "sport": "Football",
      "keywords": ["Champions League", "UCL", "UEFA"],
      "teams": [
        "Arsenal",
        "Bayern München",
        "Paris Saint-Germain",
        "Manchester City",
        "Real Madrid",
        "Atletico Madrid",
        "Liverpool",
        "Borussia Dortmund",
        "Tottenham Hotspur",
        "Newcastle United",
        "Chelsea",
        "Sporting CP",
        "FC Barcelona",
        "Marseille",
        "Juventus",
        "Galatasaray",
        "Monaco",
        "Bayern Leverkusen",
        "PSV",
        "Qarabağ",
        "Napoli",
        "Copenhagen",
        "Benfica",
        "Pafos",
        "Union SG",
        "Athletic Bilbao",
        "Olympiacos",
        "Frankfurt",
        "Club Brugge",
        "Bodø/Glimt",
        "Ajax",
        "Villarreal",
        "Kairat Almaty"
      ]
    },
    //=====================================================
    // FOOTBALL LEAGUES
    //=====================================================
    {
      "leagueId": "LIGA_MX",
      "leagueName": "Liga MX",
      "logo": "data:image/webp;base64,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",
      "country": "Mexico",
      "sport": "Football",
      "keywords": [],
      "teams": [
        "FC Juárez",
        "Atlas",
        "América",
        "Tijuana",
        "Tigres UANL",
        "Toluca",
        "Cruz Azul",
        "Monterrey",
        "CD Guadalajara","Guadalajara Chivas", "Chivas",
        "Pumas UNAM", "Pumas",
        "Pachuca",
        "León", "Leon",
        "Necaxa",
        "Atletico San Luis",
        "Queretaro", "Queretaro FC",
        "Santos Laguna",
        "Mazatlán FC",
        "Puebla"
      ]
    },
    {
      "leagueId": "LA_LIGA",
      "leagueName": "LALIGA EA SPORTS",
      "logo": "data:image/webp;base64,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",
      "country": "Spain",
      "sport": "Football",
      "keywords": [],
      "teams": [
        "FC Barcelona",
        "Real Madrid",
        "Villarreal",
        "Atlético Madrid",
        "Espanyol",
        "Real Betis",
        "Celta Vigo",
        "Athletic Club",
        "Elche CF", "Elche",
        "Real Sociedad",
        "Getafe CF",
        "Sevilla FC",
        "Osasuna",
        "Alvés", "Deportivo Alavés",
        "Rayo Vallecano",
        "Mallorca",
        "Girona FC", "Girona",
        "Valencia CF", "Valencia",
        "Levante",
        "Real Oviedo"
      ]
    },
    {
      "leagueId": "PREMIER_LEAGUE",
      "leagueName": "Premier League",
      "logo": "data:image/webp;base64,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",
      "country": "England",
      "sport": "Football",
      "keywords": [],
      "teams": [
        "Arsenal",
        "Manchester City",
        "Aston Villa",
        "Liverpool",
        "Brentford",
        "Newcastle United",
        "Manchester United",
        "Chelsea",
        "Fulham",
        "Sunderland",
        "Brighton & Hove Albion",
        "Everton",
        "Crystal Palace",
        "Tottenham Hotspur",
        "AFC Bournemouth",
        "Leeds United",
        "Nottingham Forest",
        "West Ham United",
        "Burnley",
        "Wolverhampton Wanderers"
      ]
    },
    {
      "leagueId": "BUNDESLIGA",
      "leagueName": "Bundesliga",
      "logo": "data:image/webp;base64,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",
      "country": "Germany",
      "sport": "Football",
      "keywords": [],
      "teams": [
        "Bayern Munich",
        "Borussia Dortmund",
        "Bayer Leverkusen",
        "RB Leipzig",
        "TSG Hoffenheim", "Hoffenheim",
        "VfB Stuttgart", "Stuttgart",
        "Eintracht Frankfurt",
        "SC Freiburg", "Freiburg",
        "1. FC Union Berlin", "Union Berlin",
        "Werder Bremen",
        "Borussia Mönchengladbach",
        "VfL Wolfsburg", "Wolfsburg",
        "FC Augsburg",
        "St. Pauli", "St Pauli",
        "1. FC Heidenheim", "1. FC Heidenheim 1846",
        "1. FC Koln", "FC Cologne",
        "Mainz",
        "Hamburg"
      ]
    },
    {
      "leagueId": "SERIE_A",
      "leagueName": "Serie A",
      "logo": "data:image/webp;base64,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",
      "country": "Italy",
      "sport": "Football",
      "keywords": [],
      "teams": [
        "Internazionale Milano", "Internazionale", "Inter Milan",
        "AC Milan",
        "Napoli",
        "Juventus",
        "AS Roma", "Roma",
        "Como",
        "Atalanta",
        "Bologna",
        "Udinese",
        "Lazio",
        "Sassuolo",
        "Torino",
        "Cremonese",
        "Cagliari",
        "Parma",
        "Lecce",
        "Génova", "Genoa",
        "Hellas Verona",
        "Fiorentina",
        "Pisa"
      ]
    },
//=========================================
//American Football Leagues
//=========================================
// ==========================================
    // AMERICAN FOOTBALL
    // ==========================================
    {
      "leagueId": "NFL",
      "leagueName": "NFL",
      "logo": "data:image/webp;base64,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",
      "country": "USA",
      "sport": "American Football",
      "keywords": [],
      "teams": [
        "Arizona Cardinals",
        "Atlanta Falcons",
        "Baltimore Ravens",
        "Buffalo Bills",
        "Carolina Panthers",
        "Chicago Bears",
        "Cincinnati Bengals",
        "Cleveland Browns",
        "Dallas Cowboys",
        "Denver Broncos",
        "Detroit Lions",
        "Green Bay Packers",
        "Houston Texans",
        "Indianapolis Colts",
        "Jacksonville Jaguars",
        "Kansas City Chiefs",
        "Las Vegas Raiders",
        "Los Angeles Chargers",
        "Los Angeles Rams",
        "Miami Dolphins",
        "Minnesota Vikings",
        "New England Patriots",
        "New Orleans Saints",
        "New York Giants",
        "New York Jets",
        "Philadelphia Eagles",
        "Pittsburgh Steelers",
        "San Francisco 49ers",
        "Seattle Seahawks",
        "Tampa Bay Buccaneers",
        "Tennessee Titans",
        "Washington Commanders"
      ]
    },
    {
      "leagueId": "NCAA_FB",
      "leagueName": "NCAA College Football",
      "logo": "data:image/webp;base64,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",
      "country": "USA",
      "sport": "American Football",
      "keywords": ["NCAA", "College Football", "CFB", "Bowl"],
      "teams": [
        "Alabama Crimson Tide", "Alabama",
        "Georgia Bulldogs", "Georgia",
        "Michigan Wolverines", "Michigan",
        "Ohio State Buckeyes", "Ohio State",
        "Texas Longhorns", "Texas",
        "Florida State Seminoles", "FSU",
        "Oregon Ducks", "Oregon",
        "Washington Huskies", "Washington",
        "LSU Tigers", "LSU",
        "Notre Dame Fighting Irish", "Notre Dame",
        "Clemson Tigers", "Clemson",
        "Tennessee Volunteers", "Tennessee",
        "Penn State Nittany Lions", "Penn State",
        "Oklahoma Sooners", "Oklahoma",
        "USC Trojans", "USC",
        "Ole Miss Rebels", "Ole Miss",
        "Missouri Tigers", "Missouri",
        "Miami Hurricanes", "Miami FL",
        "Florida Gators", "Florida",
        "Auburn Tigers", "Auburn",
        "Texas A&M Aggies", "Texas A&M",
        "Colorado Buffaloes", "Colorado"
      ]
    },
    // ==========================================
    // BASEBALL
    // ==========================================
    // ==========================================
    // BASEBALL - TORNEOS INTERNACIONALES (PRIORIDAD ALTA)
    // ==========================================
    {
      "leagueId": "WBC",
      "leagueName": "World Baseball Classic",
      "logo": "data:image/webp;base64,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",
      "country": "World",
      "sport": "Baseball",
      "keywords": ["WBC", "World Baseball Classic", "Clásico Mundial"],
      "teams": [
        "Team USA", "United States",
        "Team Mexico", "Mexico",
        "Team Japan", "Japan", "Samurai Japan",
        "Team Dominican Republic", "Dominicana",
        "Team Puerto Rico", "Puerto Rico",
        "Team Venezuela", "Venezuela",
        "Team Cuba", "Cuba",
        "Team South Korea", "Korea",
        "Team Netherlands", "Netherlands",
        "Team Canada", "Canada"
      ]
    },

    // ==========================================
    // LIGAS NACIONALES (BASEBALL)
    // ==========================================
    {
      "leagueId": "MLB",
      "leagueName": "MLB",
      "logo": "data:image/webp;base64,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",
      "country": "USA",
      "sport": "Baseball",
      "keywords": [],
      "teams": [
        "Arizona Diamondbacks",
        "Atlanta Braves",
        "Baltimore Orioles",
        "Boston Red Sox",
        "Chicago White Sox",
        "Chicago Cubs",
        "Cincinnati Reds",
        "Cleveland Guardians",
        "Colorado Rockies",
        "Detroit Tigers",
        "Houston Astros",
        "Kansas City Royals",
        "Los Angeles Angels",
        "Los Angeles Dodgers",
        "Miami Marlins",
        "Milwaukee Brewers",
        "Minnesota Twins",
        "New York Yankees",
        "New York Mets",
        "Oakland Athletics",
        "Philadelphia Phillies",
        "Pittsburgh Pirates",
        "San Diego Padres",
        "San Francisco Giants",
        "Seattle Mariners",
        "St. Louis Cardinals",
        "Tampa Bay Rays",
        "Texas Rangers",
        "Toronto Blue Jays",
        "Washington Nationals"
      ]
    },
    {
      "leagueId": "LMB",
      "leagueName": "Liga Mexicana de Beisbol",
      "logo": "data:image/webp;base64,UklGRtoLAABXRUJQVlA4TM4LAAAvlcAUEBUDw7Ztw1D/n91uS7sHImICeiaV0qpxhWwb9/UWc/UQGvd1ytqWNE+POkgvnejRIQ8d6hLckJ7NEW/ubfgbM5WeSvNq6Ub6rRUJlFi7cv4SZglawsCcc54laClaipYwS9ASBhoKGhpmq+revvdNuOZmjzmqmjhnPlXHOaimodmDjzVRfZn+BbirVOKzBntgO/tA/Q20c7aFTcewzT6Ctm1jCGewQj20QemJXKwiSarTTrAWKZGGlMUBn3lsUWgaScpJeSkvBSkvDSlIoKRiGLhtpChd3lk4xhfQcf/fceM455xzdu8j6AAOOsIeZY/CI2zp7HcUHsGpioLm/d9selL9L59bkthO29I5T7m5crvdjqMwKjjCdpHdW4B4/V7AOdsSCAzmVxGzmcCAEmBhWtUuqQWcEwFHtW07zaHMkcB38pCCFCSkJ8MvIRKuBDoMb5TETW3bUrNxgASkIOVLoEz5yszzVH4pSHnpfvkdhEEkW0He/0APoxiFaEQxCkGcWYeyrcTNA1wQ6ZYQSPMFvDbpKvTtWDdiXoLBE52FYuazUR+e1aUYN2Heivnu9RhXoM9DnYrw2KHbyE1IKD0Ru/QBskvtUXt0tYQ359MQPgvhfdYBc/16I69Wdx2MU5/3mKbh8pkN5cKFclbNyjhlfGXcI84RhHZxygc5o2J7InCyRvVgrJoudNusWKhdku/yRilnoHSIAMg4ZoFNQsj3VRJv63oxZ30tpN3B65e//gsmOCXAPvagu9gVD+AaDsC/xMwJwwbtIPtAsCoCmDGtMuvKobf2QQKhhgoz6852coKroHaOsqLaoHStkKbJLk1ZPVIQNUuOugdjlHAGdP5jkKAzM1s01bkAQM6pvpibbOtZOoVaiXw7wnIuyHtUduek6bqAnIi6AtaZPh88oR5RJ4/g5BFHNviXIf+AyJPzk5MJma65I8xGU8sACYfaIjNvxwqewPYJlXqeViTRqZp6Ps1YEIjSzIccYmIHR1lfnOcqXrClD6aZPOKzTnObnttZSJL4VD6hcpIsa4vz7SpewAMhaw+5dgvSc51and6zvB/vBpm5PZkJ0NAY29X4tRDRvk4n2r0jzKd0ASL6U27TF84LHi8HdK79FDWC+Lb7Thj41J/WmZ2+LwKRP3wG64WzXq+gp6efTXtu0pRhOSler909s/t/6xfUOp0LZ/0ymDk/psUMlpvssWd3X689g7yh87bcJMn1l/1At1MTl17MQDxFqad1pgKoaBy9e/OArQdyZo4PVmaI1qqKCjLMWqA6AqqzVXPcypGsUUkKYKQHVgihc3zvmCTzDo+ln717M/K3ms+FmYa8VVBVV60IkMBs8EEQubkDOUNM9AYBuaeagkR525zaCyTc8lNeAZAcuMMjwc/ojFubVLn0aQ4y3Ab9SasiokrTTG646NNPiXu70s4PAW7lNUzvKSepPRGYrUH5mMBYOLl/yltTNDaZuYsMQs26ZMkHP8ejfsxRoWZWZMkb9VELL5a26RoBRssKlDrwTImNgMiO/LHW1mqgv52DiCCHvVw5VX1h5hoAefQWsqwzDgcHLO85yQwAOAdYwFpY6bZOu2N6iqgKIGFmXRGg0IEAy04V3L1sBjpGJPBog9vccVOwlsyehRqIbAseHqCQ1pk5yf8fHxMHeztssMx0smWcbIcyxmyGBGlt7XuEj67pUOMR9y9/qezSuYpJCvyNMml/L4edGNZK1OihAkRoGuMQ0UYOKTewvE8iALk06lvx5dnBDMBX/YNOxKnwQBTJgfUggma5TaBvAs8VyA2Ssx0j/JiOvvWecpdlAsBSX6j4Bb199FYlWFASAZlA5bY55KbUJYX1NRzBj6WSi1++YlljtY8iAE0DRKCbahu+x7BtgRIbcm3VE54IV/89OyPSyl/scwW9Ef6klWvdJE7y6CRPBvCzqWGdOS+G8urlndpyyg38DeFKaHYmYicsiF9i91yBJaebdNZypCeqp4CogjuHciLsbdbRGsDSYnz2kzeQFmPsg7qt12HhdabVAv3taLcBantiqF42pJuUBkBxUDtOeZcqbzNETF/L105OHZoUAFl+FIBuoP0r4WQI4VAz73EBfLUoFO4dt+Krt+h+677minP1kPLtCp132u13OkBFO1SAaU/uHY9ePJNrvWZXiaRDh8hO1xTpwhz5O+3hS2qbHMg41cw7AqEivve8unc92hFP8qs2ko1rkSEHp06zg62/toYvzUL7HUfyFc2MhKv43vPr3vVqR/zl2HoOdhUJLh+YTu7GaT3HgOLJmmO67cfmX4cv3dH01zZQaGMjbwgngGD1ZV2MVw+uR3l98Ufca4ytJ32sxLmFCIxpGSMB2nyvLAxebi8sEAcVTnVKB6YXR+XB9eqAB9AbKyHx22I+kmwcIvR6dQXvAsvWScOF4UcjbUgQ10SqXnIpFISDGK8eXJ8e3J+eH8WXv0CmxN+Rh57tRWiaAU1ZeuipiAERSEwutH51uqhC5gRYEgpivHrwfJKUx2/gU4mXm5FTh98l6rB1AnWjaS/c+Wm87mWq0kYXj+oIETwQglU3iahHT1O31get4MUXPZucONQlbveFQizGEHskHDz0GKwSelIQRfR6XF8FSGr/+itQxk15VgPeVQDT/ZLDCi1mJPWP3gKzVQSxHzhgFWDLEhKtX3+949v9aqRxxYMO04MFUCb1Z+KXV2jj5biPwxkegK2aet5r8o4ZNB0JBYqjDU+CNOmY7s/GdE3XARlzqMfGISQBgn5/lD28RX+550lr4UzXdODzXlCrbTgwdrQ8gYHxMr6uaTlAYPNsqEugTCtAEPdjDz+lWr2cjj6xsBEGSpS0Fur8TXlNMV1PNtOcM2TWhfkDL1YKVf245NB/W5yNuToA2dN0IiBe62oGRa6/FqBrLhpHXTOAWrdrxBmAJY/PCFvRkJ5Q3rpCFtJanQcMy5EfznTJMVXolgaHKU9Q7gegKbA/1y2w9aUmIh+v8JmrsLxJEymJdknwLDNJzU/0+ydQcjJdcQtF+44xTSXPrJNeCogUNaYJJKl+1UI128W7aBwHjZRKHFIWIrjuZpL/khtCdF22Tjpjfid/Pjcy5lMQ3WqYImsUwHQpF9KpyuAT+FXGU3BTvjm6pT3TigPjgEpeKci/gJohQP6Fx/j6DYTJ6k/sPEAuuyJwigdFA6J7J8a4v3hxfsGv8S9kYIGoeYEEgkfpqNYQe8n8J+RXaZqWCBCpAYqIp/MkzIoXkxftacskzVL306UAj4+VlyL1J6mpVKLeA3I6y/IdYb1UoKnyq/rsa2HrucOUc1OorYQAYFK3K8zavXK5OArV2dajaQB8+Zp+C2iz1nIgcLpkEHBEu/zi0K7yBT9mFPJ1v6acliMCiChELppSZZizAoHS9OwxHO0yr4XMlF/9suIjwRjNEfESXsSALZaoAUSEOwNviiUFCvAIDQ0PTQUKjMQVEAlAg0AVEKopJgMhd2J3XA1heLCAGAuUAWWYWEHqDwRcRTBEqgJARfUiQTDX1j64QjmAK6CKDlQroi5wFYguKMBq4B1AtNiChJeaeSzwD484rxQgQs3StFRsrEqMQWkAcSXWTwo0HQVA7POuZrkvguQR+/LGwpglisvXpxeHblexQ4i80BUIUAsI2WdVqIsvggHyL7/+zI3pb1paLZL0Z1dDuoUaAmdmZlQ9olQhTjpRGuFVuhPSrCe2KJIsPxOTD/V9RC7d1ciSwuePIXXv7kybDmXm7lo1ObcXlaw6hEd9ClFbSpWH92LP9BOvF+rlY4VIiv7+8utD5jOfvKl+kdvF/+iY+ny0+GBe8IjHmP2FcJq4vHnztzMrMBxDD4VOttbBAthvJiozu60tByZ8ngad5TFHPwtDpXLu2zF+aDfbiJ9hiJzX5l5tKmfJOf1+bDX7sDm2mSskfHBPYCv8X26sTdGvctb2dXYQyfpxQMjJFJLKudJz9KmU8YFTzgmD/ARrI/rcSSbIS+HHE95VAJiQhxGPL7y+jKvcExtv+KCMROMPXY/BfDMmawMG",
      "country": "Mexico",
      "sport": "Baseball",
      "keywords": ["LMB", "Liga Mexicana"],
      "teams": [
        "Diablos Rojos del México",
        "Tigres de Quintana Roo",
        "Sultanes de Monterrey",
        "Toros de Tijuana",
        "Leones de Yucatán",
        "Olmecas de Tabasco",
        "El Águila de Veracruz",
        "Pericos de Puebla",
        "Guerreros de Oaxaca",
        "Saraperos de Saltillo",
        "Acereros de Monclova",
        "Tecolotes de los Dos Laredos",
        "Algodoneros de Unión Laguna",
        "Rieleros de Aguascalientes",
        "Bravos de León",
        "Piratas de Campeche",
        "Caliente de Durango",
        "Charros de Jalisco",
        "Conspiradores de Querétaro",
        "Dorados de Chihuahua"
      ]
    },
    {
      "leagueId": "LMP",
      "leagueName": "Liga Mexicana del Pacífico",
      "logo": "data:image/webp;base64,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",
      "country": "Mexico",
      "sport": "Baseball",
      "keywords": ["LMP", "Liga del Pacifico", "Arco"],
      "teams": [
        "Águilas de Mexicali",
        "Naranjeros de Hermosillo",
        "Yaquis de Obregón",
        "Mayos de Navojoa",
        "Cañeros de Los Mochis",
        "Algodoneros de Guasave",
        "Tomateros de Culiacán",
        "Venados de Mazatlán",
        "Charros de Jalisco",
        "Sultanes de Monterrey" 
      ]
    },
    // ==========================================
    // 1. FORMULA 1 (La categoría reina)
    // ==========================================
    {
      "leagueId": "FORMULA_1",
      "leagueName": "Formula 1",
      "logo": "data:image/webp;base64,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",
      "country": "International",
      "sport": "Motor Sports",
      "keywords": [
        "Formula 1", "F1", "Grand Prix", "GP", "Gran Premio",
        "Qualifying", "Clasificación", "Sprint", "Practice", "Práctica"
      ],
      "teams": [
        "Formula 1", "F1",
        "Red Bull", "Mercedes", "Ferrari", "McLaren", "Aston Martin", "Alpine", "Williams", "Haas", "Sauber", "RB"
      ]
    },

    // ==========================================
    // 2. MOTOS DE PISTA (MotoGP, Superbike)
    // ==========================================
    {
      "leagueId": "MOTO_ROAD_RACING",
      "leagueName": "MotoGP / SBK",
      "logo": "data:image/webp;base64,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",
      "country": "International",
      "sport": "Motor Sports",
      "keywords": [
        "MotoGP", "Moto2", "Moto3", "Grand Prix", 
        "Superbike", "WSBK", "WorldSBK", "Isle of Man TT"
      ],
      "teams": [
        "MotoGP", "Moto2", "Moto3", "WSBK", "Superbike",
        "Ducati", "Yamaha", "Honda", "KTM", "Aprilia"
      ]
    },

    // ==========================================
    // 3. MOTOCROSS & SUPERCROSS (Off-road)
    // Incluye tu dato: "Supercross: Anaheim"
    // ==========================================
    {
      "leagueId": "MOTO_OFFROAD",
      "leagueName": "Supercross / Motocross",
      "logo": "data:image/webp;base64,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",
      "country": "International",
      "sport": "Motor Sports",
      "keywords": [
        "Supercross", "AMA Supercross", "Anaheim", // Dato específico
        "Motocross", "MXGP", "Pro Motocross", "SuperMotocross", "SMX",
        "X-Trial", "TrialGP"
      ],
      "teams": [
        "Supercross", "AMA Supercross", 
        "Motocross", "MXGP", 
        "Anaheim" // Por si la API lo manda como HomeTeam
      ]
    },

    // ==========================================
    // 4. FORMULA E & ELECTRIC (Coches eléctricos)
    // Incluye tu dato: "Formula E: Race: Mexico City"
    // ==========================================
    {
      "leagueId": "FORMULA_E",
      "leagueName": "Formula E / Electric",
      "logo": "data:image/webp;base64,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",
      "country": "International",
      "sport": "Motor Sports",
      "keywords": [
        "Formula E", "E-Prix", "ABB FIA", "Electric", 
        "Mexico City", "Berlin", "Monaco", "Tokyo" // Ciudades comunes del calendario
      ],
      "teams": [
        "Formula E", "ABB FIA Formula E",
        "Porsche", "Jaguar", "Andretti", "Maserati", "Nissan", "McLaren", "DS Penske"
      ]
    },

    // ==========================================
    // 5. USA RACING (NASCAR & INDYCAR)
    // ==========================================
    {
      "leagueId": "USA_RACING",
      "leagueName": "NASCAR / IndyCar",
      "logo": "",
      "country": "USA",
      "sport": "Motor Sports",
      "keywords": [
        "NASCAR", "Cup Series", "Xfinity", "Truck Series", "Daytona", 
        "IndyCar", "Indy 500", "Indianapolis 500"
      ],
      "teams": [
        "NASCAR", "Cup Series", 
        "IndyCar", "NTT IndyCar Series", 
        "Penske", "Ganassi", "Hendrick", "Gibbs"
      ]
    },

    // ==========================================
    // 6. RALLY & RAID (WRC, Dakar)
    // ==========================================
    {
      "leagueId": "RALLY_RAID",
      "leagueName": "Rally (WRC) / Dakar",
      "logo": "",
      "country": "International",
      "sport": "Motor Sports",
      "keywords": [
        "WRC", "Rally", "World Rally Championship", 
        "Dakar", "Rally Raid", "ERC"
      ],
      "teams": [
        "WRC", "Rally", "Dakar",
        "Toyota Gazoo", "Hyundai Motorsport", "Ford M-Sport"
      ]
    },

    // ==========================================
    // 7. ENDURANCE & GT (Resistencia)
    // ==========================================
    {
      "leagueId": "ENDURANCE_GT",
      "leagueName": "WEC / IMSA / GT",
      "logo": "",
      "country": "International",
      "sport": "Motor Sports",
      "keywords": [
        "WEC", "World Endurance Championship", "Le Mans", "24 Hours", "24 Heures",
        "IMSA", "Daytona 24", "Petit Le Mans",
        "GT3", "GT World Challenge", "DTM"
      ],
      "teams": [
        "WEC", "IMSA", "Le Mans",
        "Porsche Penske", "Ferrari AF Corse", "Cadillac Racing", "BMW M Team"
      ]
    },

    // ==========================================
    // 8. TOURING CARS (Turismos)
    // ==========================================
    {
      "leagueId": "TOURING_CARS",
      "leagueName": "Touring Cars (TCR/Supercars)",
      "logo": "",
      "country": "International",
      "sport": "Motor Sports",
      "keywords": [
        "Supercars", "Bathurst", "Repco Supercars", // Australia
        "BTCC", // UK
        "TCR", "TCR World Tour",
        "Stock Car" // Brasil
      ],
      "teams": [
        "Supercars", "BTCC", "TCR", "Stock Car"
      ]
    },

    // ==========================================
    // 1. MMA (Artes Marciales Mixtas)
    // Incluye: UFC, Bellator, PFL, y ligas regionales como RAF
    // ==========================================
    {
      "leagueId": "MMA_GLOBAL",
      "leagueName": "UFC / MMA",
      "logo": "",
      "country": "International",
      "sport": "Fight",
      "keywords": [
        "UFC", "MMA", "Bellator", "PFL", "Fight Night", "Octagon", 
        "Mixed Martial Arts", "Cage", 
        "RAF", "Renegade", "Real Arts of Fighting", // Tu ejemplo RAF 05
        "Covington", "Rockhold" // Nombres de tu ejemplo
      ],
      "teams": [
        "UFC", "Bellator", "PFL", "RAF", "Renegade", "KSW", "Cage Warriors",
        "Colby Covington", "Luke Rockhold", // Para asegurar match si la API los pone como team
        "Jon Jones", "Conor McGregor", "Islam Makhachev", "Ilia Topuria"
      ]
    },

    // ==========================================
    // 2. BOXEO (Profesional y Amateur)
    // Incluye: Títulos mundiales y carteleras locales
    // ==========================================
    {
      "leagueId": "BOXING_GLOBAL",
      "leagueName": "Boxeo",
      "logo": "",
      "country": "International",
      "sport": "Fight",
      "keywords": [
        "Boxing", "Boxeo", "Fight", "Pelea", "Title Bout", "Main Event", "Ring",
        // Apellidos de tu ejemplo de hoy
        "Kabayel", "Knyba", "Matias", "Smith", "Rocha", "Curiel" 
      ],
      "teams": [
        "Boxeo", "Matchroom", "Top Rank", "PBC", "Golden Boy", "DAZN Boxing",
        // Tus datos específicos
        "Agit Kabayel", "Damian Knyba", 
        "Subriel Matias", "Dalton Smith",
        "Alexis Rocha", "Raul Curiel",
        // Genéricos
        "Canelo", "Tyson Fury", "Usyk", "Inoue"
      ]
    },

    // ==========================================
    // 3. PRO WRESTLING (Lucha Libre de Entretenimiento)
    // Incluye: WWE, AEW, NJPW, TNA
    // ==========================================
    {
      "leagueId": "WRESTLING_PRO",
      "leagueName": "Wrestling (WWE/AEW)",
      "logo": "",
      "country": "USA",
      "sport": "Fight",
      "keywords": [
        "WWE", "AEW", "Wrestling", "Lucha Libre", 
        "WrestleMania", "Royal Rumble", "SummerSlam", 
        "Raw", "SmackDown", "NXT", 
        "Dynamite", "Rampage", "Collision", "All In" // "Collision" de tu ejemplo
      ],
      "teams": [
        "WWE", "AEW", "All Elite Wrestling", "TNA", "NJPW", "AAA", "CMLL",
        "Collision", // Para asegurar match con 'AEW: Saturday Night Collision'
        "Roman Reigns", "Cody Rhodes", "CM Punk"
      ]
    },

    // ==========================================
    // 4. KICKBOXING & MUAY THAI (Striking puro)
    // Incluye: Glory, ONE Championship, K-1
    // ==========================================
    {
      "leagueId": "KICKBOXING_MUAY_THAI",
      "leagueName": "Kickboxing / Muay Thai",
      "logo": "",
      "country": "International",
      "sport": "Fight",
      "keywords": [
        "Kickboxing", "Muay Thai", "Glory", "ONE Championship", "K-1", 
        "Thai Boxing", "Enfusion", "Rise"
      ],
      "teams": [
        "Glory", "Glory Kickboxing", 
        "ONE Championship", "ONE", 
        "K-1", "K1"
      ]
    },

    // ==========================================
    // 5. BARE KNUCKLE (Boxeo sin guantes)
    // Categoría en crecimiento (BKFC)
    // ==========================================
    {
      "leagueId": "BARE_KNUCKLE",
      "leagueName": "Bare Knuckle (BKFC)",
      "logo": "",
      "country": "International",
      "sport": "Fight",
      "keywords": [
        "BKFC", "Bare Knuckle", "Knuckle", "Byb"
      ],
      "teams": [
        "BKFC", "Bare Knuckle Fighting Championship", 
        "Mike Perry" // Estrella actual de este deporte
      ]
    },

    // ==========================================
    // 6. ARTES MARCIALES TRADICIONALES / OLÍMPICAS
    // Incluye: Judo, Karate, Taekwondo, Sumo
    // ==========================================
    {
      "leagueId": "MARTIAL_ARTS_TRADITIONAL",
      "leagueName": "Judo / Karate / Sumo",
      "logo": "",
      "country": "International",
      "sport": "Fight",
      "keywords": [
        "Judo", "IJF", "Grand Slam", 
        "Karate", "WKF", 
        "Taekwondo", "WT", 
        "Sumo", "Basho", 
        "Jiu-Jitsu", "BJJ", "ADCC"
      ],
      "teams": [
        "IJF", "World Judo Tour", 
        "WKF", "Karate 1", 
        "Sumo", "Grand Sumo", 
        "ADCC", "IBJJF"
      ]
    },
    // ==========================================
    // TENIS (DIVIDIDO EN 4)
    // ==========================================
    {
      "leagueId": "TENNIS_GRAND_SLAM",
      "leagueName": "Grand Slams",
      "logo": "",
      "country": "International",
      "sport": "Tennis",
      "keywords": ["Australian Open", "Roland Garros", "French Open", "Wimbledon", "US Open", "Grand Slam"],
      "teams": [
        "Australian Open", "Roland Garros", "French Open", "Wimbledon", "US Open"
      ]
    },
    {
      "leagueId": "TENNIS_CUPS",
      "leagueName": "Copas de Tenis",
      "logo": "",
      "country": "International",
      "sport": "Tennis",
      "keywords": ["United Cup", "Davis Cup", "Laver Cup", "Billie Jean King Cup", "Hopman Cup"],
      "teams": [
        "United Cup", "Davis Cup", "Laver Cup", "Billie Jean King Cup"
      ]
    },
    {
      "leagueId": "TENNIS_ATP",
      "leagueName": "ATP Tour (Masculino)",
      "logo": "",
      "country": "International",
      "sport": "Tennis",
      "keywords": ["ATP", "Masters", "Finals", "Brisbane International", "Adelaide International", "Auckland Open"],
      "teams": [
        "Brisbane International", "Adelaide International", "Auckland Open",
        "Indian Wells", "Miami Open", "Monte-Carlo", "Madrid Open", "Italian Open", "Canadian Open", "Cincinnati Open", "Shanghai Masters", "Paris Masters",
        "Novak Djokovic", "Carlos Alcaraz", "Jannik Sinner", "Daniil Medvedev", "Alexander Zverev", "Andrey Rublev", "Holger Rune", "Hubert Hurkacz", 
        "Stefanos Tsitsipas", "Alex de Minaur", "Casper Ruud", "Taylor Fritz", "Rafael Nadal", "Grigor Dimitrov", "Ben Shelton", "Tommy Paul", "Frances Tiafoe"
      ]
    },
    {
      "leagueId": "TENNIS_WTA",
      "leagueName": "WTA Tour (Femenino)",
      "logo": "",
      "country": "International",
      "sport": "Tennis",
      "keywords": ["WTA", "Brisbane International", "Adelaide International", "Auckland Open"],
      "teams": [
        "Brisbane International", "Adelaide International", "Auckland Open",
        "Iga Swiatek", "Aryna Sabalenka", "Coco Gauff", "Elena Rybakina", "Jessica Pegula", "Ons Jabeur", "Qinwen Zheng", "Marketa Vondrousova", 
        "Maria Sakkari", "Karolina Muchova", "Barbora Krejcikova", "Jelena Ostapenko", "Daria Kasatkina", "Beatriz Haddad Maia", "Jasmine Paolini"
      ]
    },

  ];

  // Respondemos con el JSON y estado 200 (OK)
  res.status(200).json(leagues);
}