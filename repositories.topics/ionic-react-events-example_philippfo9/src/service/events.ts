import moment from 'moment';

export interface IEventLocation {
    name: string;
    lat?: number;
    lng?: number;
    city: string;
    country: string;
}

export interface IEvent {
    name: string;
    description?: string;
    tags: string[];
    titlePic: string;
    location: IEventLocation;
    startDate: Date;
    endDate: Date;
    distance: number;
}

const events: IEvent[] = [
    {
        name: 'Klima Rave 20',
        description: `Kundgebung für eine bessere Klimapolitik und ein gemeinsames Europa`,
        tags: ['Techno', 'Rave', 'Non-Profit'],
        titlePic:
            'https://scontent-vie1-1.xx.fbcdn.net/v/t1.0-9/106902193_1708729552608136_3879095144659336608_o.jpg?_nc_cat=102&_nc_sid=340051&_nc_oc=AQmSekNUa1Ui_PGCA70_TPFnGGdIE7y0--IWqLI1108AHKw71NdzoNFjyTu4-lua3aruiGerzFPYF3l0QmJumPC3&_nc_ht=scontent-vie1-1.xx&oh=0c83fa59a7af10baaca5f0149fc53fcd&oe=5F2AC477',
        startDate: new Date(2020, 9, 3, 15, 0, 0),
        endDate: new Date(2020, 9, 3, 22, 0, 0),
        location: {
            name: 'Maria-Theresien-Platz',
            city: 'Vienna',
            lat: 48.204536,
            lng: 16.361533,
            country: 'Austria',
        },
        distance: 0.7,
    },
    {
        name: 'KulturTerrasse WERK - 6th Week',
        description: `Programm: Do. 09.7.2020 - DJ Tommy 3000`,
        tags: ['Techno', 'Open-Air', 'Donaukanal', 'Drinks'],
        titlePic:
            'https://scontent-vie1-1.xx.fbcdn.net/v/t1.0-9/104770275_3029009440526632_5814628024376917750_o.jpg?_nc_cat=111&_nc_sid=340051&_nc_oc=AQlWNGOj8FGdw1DMkFBXGQWvuQYJT99nCzEQ8f7zTlGsdP3HLhnEASABpC4kUsZOR8yVUzOcYLvoadC7qDpL97J7&_nc_ht=scontent-vie1-1.xx&oh=1f4af80ddd4ad9d02e9fd672c0362563&oe=5F2C0A71',
        startDate: new Date(2020, 7, 9, 16, 0, 0),
        endDate: new Date(2020, 7, 9, 23, 0, 0),
        location: {
            name: 'Das Werk Wien',
            city: 'Vienna',
            lat: 48.233748,
            lng: 16.360724,
            country: 'Austria',
        },
        distance: 2.4,
    },
    {
        name: 'Unter Freunden im Donau',
        description: `Zurzeit ist eher mau mit Feiern, also schauen wir am Boden und sehen wie sich die Wurzeln , vergraben, verranken, verzweigen und verbinden. Aus diesem Grund stehen viele von uns stabil wie eine dicke fette Eiche im Wind und meinen, dass es gerade in diesen Zeiten wichtig ist Unter Freunden zu sein. Alles mit Vernunft, Verstand und Verantwortung, versteht sich.`,
        tags: ['Techno', 'Drinks', 'Club'],
        titlePic:
            'https://scontent-vie1-1.xx.fbcdn.net/v/t1.0-9/106327187_2996317227089556_8958954789679659297_o.jpg?_nc_cat=104&_nc_sid=340051&_nc_oc=AQljqXsU1r3D4IX8nlcGiibjgv6bQGqqdOrL1Z5rJtf_7-StY8Le9QpgbaDIrWK1lDP3Qwg2DFcatXzPFpw1MdAH&_nc_ht=scontent-vie1-1.xx&oh=f02d434efec446d883e3751ad3c5b139&oe=5F2D9B64',
        startDate: new Date(2020, 7, 11, 21, 0, 0),
        endDate: new Date(2020, 7, 12, 1, 0, 0),
        location: {
            name: 'DonauTechno',
            city: 'Vienna',
            lat: 48.202393,
            lng: 16.357691,
            country: 'Austria',
        },
        distance: 0.4,
    },
];

export function formatEventDate(event: IEvent): string {
    const startMom = moment(event.startDate);
    const endMom = moment(event.endDate);
    if (startMom.isSame(endMom, 'day')) {
        return `${formatDayOfDate(startMom)} at ${formatTimeOfDate(startMom)}`;
    } else {
        return `${formatDayOfDate(startMom)} - ${formatDayOfDate(endMom)}`;
    }
}

function formatTimeOfDate(momDate: moment.Moment): string {
    return momDate.format('HH:mm');
}

function formatDayOfDate(momDate: moment.Moment): string {
    return momDate.format('ddd, MMM DD');
}

export default events;
