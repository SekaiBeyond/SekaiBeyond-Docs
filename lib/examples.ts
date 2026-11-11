// The request and response shown beside each endpoint's page. One copy serves
// every language, so the English and Chinese pages can't drift apart.

export type Method = 'GET' | 'POST';

export const statusText: Record<number, string> = { 200: 'OK', 201: 'Created' };

export interface Operation {
    method: Method;
    /** With example values filled in, as a caller would send it. */
    path: string;
    /** Whether the example is called with a server API key (default) or a signed-in person's ID token. */
    auth?: 'key' | 'token';
    body?: unknown;
    status: number;
    response: unknown;
}

const president = {
    uid: 'p9Qr2St5Uv8Wx1Yz4Ab7',
    displayName: 'Aoi',
    photoURL: 'https://firebasestorage.googleapis.com/v0/b/…/o/avatars%2F…',
    group: 'president',
    // Only staff and core-staff can have a title.
    title: '',
    titleCn: '',
};

const person = {
    uid: 'fuD4lKy5QIf0WMxCDLAUvkq4su32',
    displayName: 'Mika',
    photoURL: 'https://firebasestorage.googleapis.com/v0/b/…/o/avatars%2F…',
    group: 'core-staff',
    title: 'Designer',
    titleCn: '设计师',
};

const eventStaffMember = {
    uid: 'm4Nk7Lp0Qr3St6Uv9Wx2',
    displayName: 'Ren',
    photoURL: '',
    group: 'user',
    title: '',
    titleCn: '',
};

const unarchivedEvent = {
    id: 'k3Xq9VbLm2PzR8TaYw4N',
    archived: false,
    onSale: true,
    title: 'Sekai Beyond Con 2026',
    titleCn: '彼世界动漫游戏展 2026',
    description: 'Our yearly convention.\nCosplay, vendors and stage shows.',
    descriptionCn: '我们一年一度的漫展。\nCosplay、摊位和舞台表演。',
    location: 'HUB Ballroom',
    locationCn: 'HUB 宴会厅',
    venueId: 'hub',
    published: true,
    paid: true,
    deleteAt: null,
    con: { year: 2026 },
    startAt: '2026-11-14T18:00:00.000Z',
    endAt: '2026-11-15T02:00:00.000Z',
    poster: 'https://firebasestorage.googleapis.com/v0/b/…/o/upcoming-events%2F…',
    posterCredit: 'Mika',
    emailHeaderBg: '',
    buyTicket: 'https://sekaibeyond.com/con',
    learnMore: '',
    customButtonText: '',
    customButtonTextCn: '',
    customButtonLink: '',
};

const archivedEvent = {
    id: 'aB7cD8eF9gH0iJ1kL2mN',
    archived: true,
    onSale: false,
    title: 'Spring Game Night',
    titleCn: '春季游戏之夜',
    description: 'Board games and rhythm games.',
    descriptionCn: '桌游和音游。',
    location: 'Mary Gates Hall 241',
    locationCn: 'Mary Gates Hall 241',
    venueId: '',
    published: true,
    paid: false,
    deleteAt: null,
    con: null,
    date: '2026-04-18',
    tagIds: ['gameNight'],
    icon: 'https://firebasestorage.googleapis.com/v0/b/…/o/events%2F…',
    recapLink: '',
    recapLinkCn: 'https://www.xiaohongshu.com/…',
};

const eventId = unarchivedEvent.id;
const orderId = 'WX20261028123456';
const buyer = { name: '李明', email: 'liming@qq.com' };

function ticket(ticketId: string, type: string, redeemedAt: string | null) {
    return {
        ticketId,
        type,
        qr: `https://sekaibeyond.com/claim?ticket=${ticketId}&event=${eventId}`,
        status: redeemedAt ? 'used' : 'valid',
        createdAt: '2026-10-28T09:12:44.311Z',
        redeemed: redeemedAt !== null,
        redeemedAt,
        voided: false,
    };
}

const newOrder = {
    orderId,
    eventId,
    createdAt: '2026-10-28T09:12:44.311Z',
    updatedAt: '2026-10-28T09:12:44.402Z',
    buyer,
    emailStatus: 'sent',
    ticketCount: 2,
    tickets: [
        ticket('3f0c1e9a-5b7d-4c2e-9a41-7d8e2b6f1c05', 'normal', null),
        ticket('b81d4f62-0e3a-4a9c-8f17-2c5b9e7d3a10', 'student', null),
    ],
};

// The same order on the night, after its first ticket was scanned at the door.
const scannedOrder = {
    ...newOrder,
    updatedAt: '2026-11-14T18:31:02.907Z',
    tickets: [
        ticket('3f0c1e9a-5b7d-4c2e-9a41-7d8e2b6f1c05', 'normal', '2026-11-14T18:31:02.907Z'),
        ticket('b81d4f62-0e3a-4a9c-8f17-2c5b9e7d3a10', 'student', null),
    ],
};

export const examples = {
    getMe: {
        method: 'GET',
        path: '/v1/me',
        auth: 'token',
        status: 200,
        response: person,
    },
    listTeam: {
        method: 'GET',
        path: '/v1/team',
        auth: 'token',
        status: 200,
        response: { people: [president, person] },
    },
    listEventStaff: {
        method: 'GET',
        path: `/v1/events/${eventId}/staff`,
        auth: 'token',
        status: 200,
        response: { eventId, staff: [person, eventStaffMember] },
    },
    listEvents: {
        method: 'GET',
        path: '/v1/events',
        status: 200,
        response: { events: [unarchivedEvent, archivedEvent] },
    },
    getEvent: {
        method: 'GET',
        path: `/v1/events/${eventId}`,
        status: 200,
        response: unarchivedEvent,
    },
    createOrder: {
        method: 'POST',
        path: `/v1/events/${eventId}/orders`,
        body: {
            orderId,
            buyer,
            tickets: [
                { type: 'normal', count: 1 },
                { type: 'student', count: 1 },
            ],
            sendEmail: true,
        },
        status: 201,
        response: newOrder,
    },
    getOrder: {
        method: 'GET',
        path: `/v1/events/${eventId}/orders/${orderId}`,
        status: 200,
        response: scannedOrder,
    },
} satisfies Record<string, Operation>;

export type OperationId = keyof typeof examples;

export const objectExamples = {
    person,
    unarchivedEvent,
    archivedEvent,
    order: scannedOrder,
};
