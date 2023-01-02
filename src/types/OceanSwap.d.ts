export type OceanSwap = {
    id: string;
    timestamp: string;
    fromSymbol: string;
    fromAmount: string;
    toSymbol: string;
    toAmount: string;
};

export type OceanSwapResponse = [{
    id: string;
    txid: string;
    txno: number;
    poolPairId: string;
    sort: string;
    fromAmount: string;
    fromTokenId: string;
    block: {
        hash: string;
        height: number;
        time: number;
        medianTime: number; 
    };
    from: OceanSwapSide;
    to: OceanSwapSide;
    type: string;
}];

export type OceanSwapSide = {
    address: string;
    symbol: string;
    amount: string;
    displaySymbol: string;
};