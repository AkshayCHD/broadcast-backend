export interface IAddBroadcastBody {
	userId: string
}

export interface ILeaveBroadcastBody {
	userId: string
}

export interface IGetActiveBroadcastsBody {
	limit: number,
	skip: number
}
