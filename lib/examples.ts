// The request and response shown beside each endpoint's page. One copy serves
// every language, so the English and Chinese pages can't drift apart.

export type Method = 'GET' | 'POST' | 'DELETE';

export const statusText: Record<number, string> = { 200: 'OK', 201: 'Created' };

export interface Operation {
    method: Method;
    /** With example values filled in, as a caller would send it. */
    path: string;
    body?: unknown;
    status: number;
    response: unknown;
}

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
    date: '2026-04-18',
    tagIds: ['gameNight'],
    icon: 'https://firebasestorage.googleapis.com/v0/b/…/o/events%2F…',
    recapLink: '',
    recapLinkCn: 'https://www.xiaohongshu.com/…',
};

const eventId = unarchivedEvent.id;
const orderId = 'WX20261028123456';
// The seller app's own ID for its user, which binds them to a site account.
const appUserId = '10086';
const buyer = { name: '李明', email: 'liming@qq.com', appUserId };

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

const accountUid = 'Xq3L9vKe2mPZ8hTa1RwYc5NfG7j2';
const linkCode = 'K7MP4QXR';

const accountLink = {
    appUserId,
    uid: accountUid,
    displayName: 'Ming Li',
    photoURL: 'https://lh3.googleusercontent.com/a/…',
    nickname: '小明',
    linkedAt: '2026-10-30T09:14:27.530Z',
};

const accountProfile = {
    appUserId,
    uid: accountUid,
    displayName: 'Ming Li',
    photoURL: 'https://lh3.googleusercontent.com/a/…',
    bannerURL: '',
    joinedAt: '2025-09-20T04:12:08.000Z',
    group: 'staff',
    title: 'Photographer',
    titleCn: '摄影',
    member: { since: '2026-01-10T08:00:00.000Z', until: '2027-01-11T07:59:59.999Z' },
    badges: [
        {
            id: 'firstCon',
            name: 'First Con',
            nameCn: '初次参展',
            description: 'Came to your first Sekai Beyond Con.',
            descriptionCn: '第一次参加彼世界漫展。',
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/…/o/badges%2F…',
            earnedAt: '2025-11-15T19:02:41.000Z',
        },
    ],
    passports: [
        {
            id: 'K2M9QX7PRA',
            year: 2026,
            claimedAt: '2026-01-10T08:00:00.000Z',
            name: 'Passport 2026',
            nameCn: '2026 通行证',
            coverImageUrl: 'https://firebasestorage.googleapis.com/v0/b/…/o/passport-designs%2F…',
        },
    ],
    events: [
        {
            id: archivedEvent.id,
            title: archivedEvent.title,
            titleCn: archivedEvent.titleCn,
            date: archivedEvent.date,
            icon: archivedEvent.icon,
            staff: true,
        },
    ],
};

export const examples = {
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
    previewAccountLink: {
        method: 'POST',
        path: '/v1/account-links/preview',
        body: { code: linkCode, appUserId },
        status: 200,
        response: {
            displayName: 'Ming Li',
            photoURL: 'https://lh3.googleusercontent.com/a/…',
            email: 'l***@gmail.com',
            expiresAt: '2026-10-30T09:21:03.118Z',
        },
    },
    createAccountLink: {
        method: 'POST',
        path: '/v1/account-links',
        body: { code: linkCode, appUserId, nickname: '小明', unionid: 'oVx5a6Kd2Qe9WmPz3RtY8uBn1Hc0' },
        status: 201,
        response: accountLink,
    },
    getAccountLink: {
        method: 'GET',
        path: `/v1/account-links/${appUserId}`,
        status: 200,
        response: accountLink,
    },
    deleteAccountLink: {
        method: 'DELETE',
        path: `/v1/account-links/${appUserId}`,
        status: 200,
        response: { appUserId, unlinked: true },
    },
    getAccountProfile: {
        method: 'GET',
        path: `/v1/account-links/${appUserId}/profile`,
        status: 200,
        response: accountProfile,
    },
} satisfies Record<string, Operation>;

export type OperationId = keyof typeof examples;

export const objectExamples = {
    unarchivedEvent,
    archivedEvent,
    order: scannedOrder,
    accountLink,
    accountProfile,
};
