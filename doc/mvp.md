#### Mitä halutaan näyttää Oodista?

Tapahtumat:

1. Luennot
2. Harkat
3. Välikoe
4. Tentit (oma kutsunsa)
5. Seminaari (halutaanko tukea?)

Käyttäjän lisäämät tapahtumat:
1. Harjoitustehtävät
2. Omat tapahtumat

#### Näkymät ja niiden toiminnallisuudet
1. Kotinäkymä
  - Lähitulevaisuuden tapahtumat (tänään tai seuraava päivä)
  - Kurssin lisäys seurattuihin kursseihin
  - Erityisilmoitukset (käyttäjän itse lisäämät)


2. Kurssinäkymä
  - Kartta, jossa seuraava tapahtuma merkattuna kartalle
  - Kurssin perustiedot
  - Tentin lisäys


3. Kalenterinäkymä
  - Kaikki tapahtumat listattuna nykyhetkestä eteenpäin
  - Mahdollisuus hypätä kurssinäkymään painamalla tapahtumaa


####  Events JSON
```
"events": [
  {
    "type":"lecture", <= lecture/exercise/midtermexam/exam/user
    "day":"Thursday",
    "startTime":"13:15",
    "endTime":"15:00",
    "locations":[
      {
       "room":"Y347",
       "building":"Kanditalo",
       "address":"Otakaari 1",
       "lan": 60.3421,
       "lng": 60.3421
      }
    ],
    "subEvents": [
      {
        "id": 324ASDASD,
        "date": "02-28-2016"
      },
    ]
  }
]
```
