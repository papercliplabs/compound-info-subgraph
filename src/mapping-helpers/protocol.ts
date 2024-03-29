import { Address, BigDecimal, BigInt, log } from "@graphprotocol/graph-ts";

import { Protocol, Market } from "../../generated/schema";

import { PROTOCOL_ID, ZERO_BD } from "../utils/constants";

/**
 * Helper function to create a new protocol
 * @param priceOracleAddress address of the cToken corresponding to the market
 * @param blockNumber block number when this was created
 * @returns a new Market object
 */
export function createProtocol(priceOracleAddress: Address, blockNumber: BigInt): Protocol {
    let protocol = new Protocol(PROTOCOL_ID);

    protocol.priceOracle = priceOracleAddress;
    protocol.lastNewOracleBlockNumber = blockNumber;
    protocol.latestBlockNumber = blockNumber;

    protocol.markets = new Array<string>();
    protocol.totalSupplyUsd = ZERO_BD;
    protocol.totalBorrowUsd = ZERO_BD;
    protocol.totalReservesUsd = ZERO_BD;
    protocol.utilization = ZERO_BD;

    return protocol;
}

/**
 * Helper function to update the protocol summary data, this will save it if successful
 * @param blockNumber block number that this function is being called
 */
export function updateProtocolSummaryData(blockNumber: BigInt): void {
    let protocol = Protocol.load(PROTOCOL_ID);

    if (protocol == null) {
        log.warning("*** ERROR: protocol was null in updateProtocolSummaryData()", []);
        return;
    }

    protocol.latestBlockNumber = blockNumber;

    const marketsIds = protocol.markets;
    const numMarkets = marketsIds.length;

    let totalSupplyUsd = ZERO_BD;
    let totalBorrowUsd = ZERO_BD;
    let totalReservesUsd = ZERO_BD;

    for (let i = 0; i < numMarkets; i++) {
        const marketId = marketsIds[i];
        const market = Market.load(marketId);

        if (market != null) {
            totalSupplyUsd = totalSupplyUsd.plus(market.totalSupplyUsd);
            totalBorrowUsd = totalBorrowUsd.plus(market.totalBorrowUsd);
            totalReservesUsd = totalReservesUsd.plus(market.totalReservesUsd);
        } else {
            // Won't happen
            log.warning("*** ERROR: a market was null in the loop of updateProtocolSummaryData()", []);
        }
    }

    let utilization = totalSupplyUsd.equals(ZERO_BD) ? ZERO_BD : totalBorrowUsd.div(totalSupplyUsd);

    protocol.totalSupplyUsd = totalSupplyUsd;
    protocol.totalBorrowUsd = totalBorrowUsd;
    protocol.totalReservesUsd = totalReservesUsd;
    protocol.utilization = utilization;

    protocol.save();
}
