import { BigDecimal, BigInt, Bytes, ethereum, log } from "@graphprotocol/graph-ts";

import {
    Market,
    MarketHourData,
    MarketDayData,
    MarketWeekData,
    Protocol,
    ProtocolWeekData,
} from "../../generated/schema";

import { SEC_PER_HOUR, SEC_PER_DAY, SEC_PER_WEEK, ZERO_BD, ZERO_BI, ONE_BD, PROTOCOL_ID } from "../utils/constants";

export function updateMarketHourData(event: ethereum.Event): void {
    const marketAddress = event.address;
    const market = Market.load(marketAddress.toHexString());

    if (market == null) {
        log.warning("*** ERROR: market was null in updateMarketHourData()", []);
        return;
    }

    const timestamp = event.block.timestamp; // unix time sec since epoche
    const hourId = timestamp.div(SEC_PER_HOUR);
    const hourStartTimestamp = hourId.times(SEC_PER_HOUR); // Rounded to the start of the hour

    const hourDataId = hourId.toString() + "-" + market.cTokenSymbol;

    let marketData = MarketHourData.load(hourDataId);
    if (marketData == null) {
        // Make a new one for this ID
        marketData = new MarketHourData(hourDataId);

        marketData.market = market.id;
        marketData.date = hourStartTimestamp;

        // Set defaults
        marketData.collateralFactor = ZERO_BD;
        marketData.reserveFactor = ZERO_BD;
        marketData.borrowCap = ZERO_BD;
        marketData.cash = ZERO_BD;
        marketData.underlyingPerCToken = ZERO_BD;
        marketData.supplyRatePerBlock = ZERO_BD;
        marketData.borrowRatePerBlock = ZERO_BD;

        marketData.supplyApy = ZERO_BD;
        marketData.borrowApy = ZERO_BD;
        marketData.totalSupplyApy = ZERO_BD;
        marketData.totalBorrowApy = ZERO_BD;
        marketData.totalSupply = ZERO_BD;
        marketData.totalSupplyUsd = ZERO_BD;
        marketData.totalBorrow = ZERO_BD;
        marketData.totalBorrowUsd = ZERO_BD;
        marketData.totalReserves = ZERO_BD;
        marketData.totalReservesUsd = ZERO_BD;
        marketData.availableLiquidity = ZERO_BD;
        marketData.availableLiquidityUsd = ZERO_BD;
        marketData.utilization = ZERO_BD;
        marketData.compSpeedSupply = ZERO_BD;
        marketData.compSpeedBorrow = ZERO_BD;
        marketData.usdcPerUnderlying = ZERO_BD;
        marketData.usdcPerEth = ZERO_BD;
        marketData.usdcPerComp = ZERO_BD;

        marketData.txCount = ZERO_BI;
    }

    const txCount = marketData.txCount.toBigDecimal();
    const oldValueWeight = txCount.div(txCount.plus(ONE_BD));
    const newValueWeigth = BigDecimal.fromString("1").div(txCount.plus(ONE_BD));

    // Compute averages: newValue = (oldValue*txCount + newValue) / (txCount + 1)
    marketData.collateralFactor = marketData.collateralFactor
        .times(oldValueWeight)
        .plus(market.collateralFactor.times(newValueWeigth));

    marketData.reserveFactor = marketData.reserveFactor
        .times(oldValueWeight)
        .plus(market.reserveFactor.times(newValueWeigth));

    marketData.borrowCap = marketData.borrowCap.times(oldValueWeight).plus(market.borrowCap.times(newValueWeigth));

    marketData.cash = marketData.cash.times(oldValueWeight).plus(market.cash.times(newValueWeigth));

    marketData.underlyingPerCToken = marketData.underlyingPerCToken
        .times(oldValueWeight)
        .plus(market.underlyingPerCToken.times(newValueWeigth));

    marketData.supplyRatePerBlock = marketData.supplyRatePerBlock
        .times(oldValueWeight)
        .plus(market.supplyRatePerBlock.times(newValueWeigth));

    marketData.borrowRatePerBlock = marketData.borrowRatePerBlock
        .times(oldValueWeight)
        .plus(market.borrowRatePerBlock.times(newValueWeigth));

    marketData.supplyApy = marketData.supplyApy.times(oldValueWeight).plus(market.supplyApy.times(newValueWeigth));

    marketData.borrowApy = marketData.borrowApy.times(oldValueWeight).plus(market.borrowApy.times(newValueWeigth));

    marketData.totalSupplyApy = marketData.totalSupplyApy
        .times(oldValueWeight)
        .plus(market.totalSupplyApy.times(newValueWeigth));

    marketData.totalBorrowApy = marketData.totalBorrowApy
        .times(oldValueWeight)
        .plus(market.totalBorrowApy.times(newValueWeigth));

    marketData.totalSupply = marketData.totalSupply
        .times(oldValueWeight)
        .plus(market.totalSupply.times(newValueWeigth));

    marketData.totalSupplyUsd = marketData.totalSupplyUsd
        .times(oldValueWeight)
        .plus(market.totalSupplyUsd.times(newValueWeigth));

    marketData.totalBorrow = marketData.totalBorrow
        .times(oldValueWeight)
        .plus(market.totalBorrow.times(newValueWeigth));

    marketData.totalBorrowUsd = marketData.totalBorrowUsd
        .times(oldValueWeight)
        .plus(market.totalBorrowUsd.times(newValueWeigth));

    marketData.totalReserves = marketData.totalReserves
        .times(oldValueWeight)
        .plus(market.totalReserves.times(newValueWeigth));

    marketData.totalReservesUsd = marketData.totalReservesUsd
        .times(oldValueWeight)
        .plus(market.totalReservesUsd.times(newValueWeigth));

    marketData.utilization = marketData.utilization
        .times(oldValueWeight)
        .plus(market.utilization.times(newValueWeigth));

    marketData.usdcPerUnderlying = marketData.usdcPerUnderlying
        .times(oldValueWeight)
        .plus(market.usdcPerUnderlying.times(newValueWeigth));

    marketData.usdcPerEth = marketData.usdcPerEth.times(oldValueWeight).plus(market.usdcPerEth.times(newValueWeigth));

    marketData.usdcPerComp = marketData.usdcPerComp
        .times(oldValueWeight)
        .plus(market.usdcPerComp.times(newValueWeigth));

    marketData.usdcPerComp = marketData.usdcPerComp
        .times(oldValueWeight)
        .plus(market.usdcPerComp.times(newValueWeigth));

    marketData.txCount = marketData.txCount.plus(BigInt.fromU32(1));

    marketData.save();
}

// Use market object to populate all these
export function updateMarketDayData(event: ethereum.Event): void {
    const marketAddress = event.address;
    const market = Market.load(marketAddress.toHexString());

    if (market == null) {
        log.warning("*** ERROR: market was null in updateMarketDayData()", []);
        return;
    }

    const timestamp = event.block.timestamp; // unix time sec since epoche
    const dayId = timestamp.div(SEC_PER_DAY);
    const dayStartTimestamp = dayId.times(SEC_PER_DAY); // Rounded to the start of the day

    const dayDataId = dayId.toString() + "-" + market.cTokenSymbol;

    let marketData = MarketDayData.load(dayDataId);
    if (marketData == null) {
        // Make a new one for this ID
        marketData = new MarketDayData(dayDataId);
        marketData.market = market.id;
        marketData.date = dayStartTimestamp;

        // Set defaults
        marketData.collateralFactor = ZERO_BD;
        marketData.reserveFactor = ZERO_BD;
        marketData.borrowCap = ZERO_BD;
        marketData.cash = ZERO_BD;
        marketData.underlyingPerCToken = ZERO_BD;
        marketData.supplyRatePerBlock = ZERO_BD;
        marketData.borrowRatePerBlock = ZERO_BD;

        marketData.supplyApy = ZERO_BD;
        marketData.borrowApy = ZERO_BD;
        marketData.totalSupplyApy = ZERO_BD;
        marketData.totalBorrowApy = ZERO_BD;
        marketData.totalSupply = ZERO_BD;
        marketData.totalSupplyUsd = ZERO_BD;
        marketData.totalBorrow = ZERO_BD;
        marketData.totalBorrowUsd = ZERO_BD;
        marketData.totalReserves = ZERO_BD;
        marketData.totalReservesUsd = ZERO_BD;
        marketData.availableLiquidity = ZERO_BD;
        marketData.availableLiquidityUsd = ZERO_BD;
        marketData.utilization = ZERO_BD;
        marketData.compSpeedSupply = ZERO_BD;
        marketData.compSpeedBorrow = ZERO_BD;
        marketData.usdcPerUnderlying = ZERO_BD;
        marketData.usdcPerEth = ZERO_BD;
        marketData.usdcPerComp = ZERO_BD;

        marketData.txCount = ZERO_BI;
    }

    const txCount = marketData.txCount.toBigDecimal();
    const oldValueWeight = txCount.div(txCount.plus(ONE_BD));
    const newValueWeigth = BigDecimal.fromString("1").div(txCount.plus(ONE_BD));

    // Compute averages: newValue = (oldValue*txCount + newValue) / (txCount + 1)
    marketData.collateralFactor = marketData.collateralFactor
        .times(oldValueWeight)
        .plus(market.collateralFactor.times(newValueWeigth));

    marketData.reserveFactor = marketData.reserveFactor
        .times(oldValueWeight)
        .plus(market.reserveFactor.times(newValueWeigth));

    marketData.borrowCap = marketData.borrowCap.times(oldValueWeight).plus(market.borrowCap.times(newValueWeigth));

    marketData.cash = marketData.cash.times(oldValueWeight).plus(market.cash.times(newValueWeigth));

    marketData.underlyingPerCToken = marketData.underlyingPerCToken
        .times(oldValueWeight)
        .plus(market.underlyingPerCToken.times(newValueWeigth));

    marketData.supplyRatePerBlock = marketData.supplyRatePerBlock
        .times(oldValueWeight)
        .plus(market.supplyRatePerBlock.times(newValueWeigth));

    marketData.borrowRatePerBlock = marketData.borrowRatePerBlock
        .times(oldValueWeight)
        .plus(market.borrowRatePerBlock.times(newValueWeigth));

    marketData.supplyApy = marketData.supplyApy.times(oldValueWeight).plus(market.supplyApy.times(newValueWeigth));

    marketData.borrowApy = marketData.borrowApy.times(oldValueWeight).plus(market.borrowApy.times(newValueWeigth));

    marketData.totalSupplyApy = marketData.totalSupplyApy
        .times(oldValueWeight)
        .plus(market.totalSupplyApy.times(newValueWeigth));

    marketData.totalBorrowApy = marketData.totalBorrowApy
        .times(oldValueWeight)
        .plus(market.totalBorrowApy.times(newValueWeigth));

    marketData.totalSupply = marketData.totalSupply
        .times(oldValueWeight)
        .plus(market.totalSupply.times(newValueWeigth));

    marketData.totalSupplyUsd = marketData.totalSupplyUsd
        .times(oldValueWeight)
        .plus(market.totalSupplyUsd.times(newValueWeigth));

    marketData.totalBorrow = marketData.totalBorrow
        .times(oldValueWeight)
        .plus(market.totalBorrow.times(newValueWeigth));

    marketData.totalBorrowUsd = marketData.totalBorrowUsd
        .times(oldValueWeight)
        .plus(market.totalBorrowUsd.times(newValueWeigth));

    marketData.totalReserves = marketData.totalReserves
        .times(oldValueWeight)
        .plus(market.totalReserves.times(newValueWeigth));

    marketData.totalReservesUsd = marketData.totalReservesUsd
        .times(oldValueWeight)
        .plus(market.totalReservesUsd.times(newValueWeigth));

    marketData.utilization = marketData.utilization
        .times(oldValueWeight)
        .plus(market.utilization.times(newValueWeigth));

    marketData.usdcPerUnderlying = marketData.usdcPerUnderlying
        .times(oldValueWeight)
        .plus(market.usdcPerUnderlying.times(newValueWeigth));

    marketData.usdcPerEth = marketData.usdcPerEth.times(oldValueWeight).plus(market.usdcPerEth.times(newValueWeigth));

    marketData.usdcPerComp = marketData.usdcPerComp
        .times(oldValueWeight)
        .plus(market.usdcPerComp.times(newValueWeigth));

    marketData.txCount = marketData.txCount.plus(BigInt.fromU32(1));

    marketData.save();
}

export function updateMarketWeekData(event: ethereum.Event): void {
    const marketAddress = event.address;
    const market = Market.load(marketAddress.toHexString());

    if (market == null) {
        log.warning("*** ERROR: market was null in updateMarketWeekData()", []);
        return;
    }

    const timestamp = event.block.timestamp; // unix time sec since epoche
    const weekId = timestamp.div(SEC_PER_WEEK);
    const weekStartTimestamp = weekId.times(SEC_PER_WEEK); // Rounded to the start of the week

    const weekDataId = weekId.toString() + "-" + market.cTokenSymbol;

    let marketData = MarketWeekData.load(weekDataId);
    if (marketData == null) {
        // Make a new one for this ID
        marketData = new MarketWeekData(weekDataId);
        marketData.market = market.id;
        marketData.date = weekStartTimestamp;

        // Set defaults
        marketData.collateralFactor = ZERO_BD;
        marketData.reserveFactor = ZERO_BD;
        marketData.borrowCap = ZERO_BD;
        marketData.cash = ZERO_BD;
        marketData.underlyingPerCToken = ZERO_BD;
        marketData.supplyRatePerBlock = ZERO_BD;
        marketData.borrowRatePerBlock = ZERO_BD;

        marketData.supplyApy = ZERO_BD;
        marketData.borrowApy = ZERO_BD;
        marketData.totalSupplyApy = ZERO_BD;
        marketData.totalBorrowApy = ZERO_BD;
        marketData.totalSupply = ZERO_BD;
        marketData.totalSupplyUsd = ZERO_BD;
        marketData.totalBorrow = ZERO_BD;
        marketData.totalBorrowUsd = ZERO_BD;
        marketData.totalReserves = ZERO_BD;
        marketData.totalReservesUsd = ZERO_BD;
        marketData.availableLiquidity = ZERO_BD;
        marketData.availableLiquidityUsd = ZERO_BD;
        marketData.utilization = ZERO_BD;
        marketData.compSpeedSupply = ZERO_BD;
        marketData.compSpeedBorrow = ZERO_BD;
        marketData.usdcPerUnderlying = ZERO_BD;
        marketData.usdcPerEth = ZERO_BD;
        marketData.usdcPerComp = ZERO_BD;

        marketData.txCount = ZERO_BI;
    }

    const txCount = marketData.txCount.toBigDecimal();
    const oldValueWeight = txCount.div(txCount.plus(ONE_BD));
    const newValueWeigth = BigDecimal.fromString("1").div(txCount.plus(ONE_BD));

    // Compute averages: newValue = (oldValue*txCount + newValue) / (txCount + 1)
    marketData.collateralFactor = marketData.collateralFactor
        .times(oldValueWeight)
        .plus(market.collateralFactor.times(newValueWeigth));

    marketData.reserveFactor = marketData.reserveFactor
        .times(oldValueWeight)
        .plus(market.reserveFactor.times(newValueWeigth));

    marketData.borrowCap = marketData.borrowCap.times(oldValueWeight).plus(market.borrowCap.times(newValueWeigth));

    marketData.cash = marketData.cash.times(oldValueWeight).plus(market.cash.times(newValueWeigth));

    marketData.underlyingPerCToken = marketData.underlyingPerCToken
        .times(oldValueWeight)
        .plus(market.underlyingPerCToken.times(newValueWeigth));

    marketData.supplyRatePerBlock = marketData.supplyRatePerBlock
        .times(oldValueWeight)
        .plus(market.supplyRatePerBlock.times(newValueWeigth));

    marketData.borrowRatePerBlock = marketData.borrowRatePerBlock
        .times(oldValueWeight)
        .plus(market.borrowRatePerBlock.times(newValueWeigth));

    marketData.supplyApy = marketData.supplyApy.times(oldValueWeight).plus(market.supplyApy.times(newValueWeigth));

    marketData.borrowApy = marketData.borrowApy.times(oldValueWeight).plus(market.borrowApy.times(newValueWeigth));

    marketData.totalSupplyApy = marketData.totalSupplyApy
        .times(oldValueWeight)
        .plus(market.totalSupplyApy.times(newValueWeigth));

    marketData.totalBorrowApy = marketData.totalBorrowApy
        .times(oldValueWeight)
        .plus(market.totalBorrowApy.times(newValueWeigth));

    marketData.totalSupply = marketData.totalSupply
        .times(oldValueWeight)
        .plus(market.totalSupply.times(newValueWeigth));

    marketData.totalSupplyUsd = marketData.totalSupplyUsd
        .times(oldValueWeight)
        .plus(market.totalSupplyUsd.times(newValueWeigth));

    marketData.totalBorrow = marketData.totalBorrow
        .times(oldValueWeight)
        .plus(market.totalBorrow.times(newValueWeigth));

    marketData.totalBorrowUsd = marketData.totalBorrowUsd
        .times(oldValueWeight)
        .plus(market.totalBorrowUsd.times(newValueWeigth));

    marketData.totalReserves = marketData.totalReserves
        .times(oldValueWeight)
        .plus(market.totalReserves.times(newValueWeigth));

    marketData.totalReservesUsd = marketData.totalReservesUsd
        .times(oldValueWeight)
        .plus(market.totalReservesUsd.times(newValueWeigth));

    marketData.utilization = marketData.utilization
        .times(oldValueWeight)
        .plus(market.utilization.times(newValueWeigth));

    marketData.usdcPerUnderlying = marketData.usdcPerUnderlying
        .times(oldValueWeight)
        .plus(market.usdcPerUnderlying.times(newValueWeigth));

    marketData.usdcPerEth = marketData.usdcPerEth.times(oldValueWeight).plus(market.usdcPerEth.times(newValueWeigth));

    marketData.usdcPerComp = marketData.usdcPerComp
        .times(oldValueWeight)
        .plus(market.usdcPerComp.times(newValueWeigth));

    marketData.txCount = marketData.txCount.plus(BigInt.fromU32(1));

    marketData.save();
}

export function updateProtocolWeekData(event: ethereum.Event): void {
    const protocol = Protocol.load(PROTOCOL_ID);

    if (protocol == null) {
        log.warning("*** ERROR: protocol was null in updateProtocolWeekData()", []);
        return;
    }

    const timestamp = event.block.timestamp; // unix time sec since epoche
    const weekId = timestamp.div(SEC_PER_WEEK);
    const weekStartTimestamp = weekId.times(SEC_PER_WEEK); // Rounded to the start of the week

    const weekDataId = weekId.toString() + "-" + protocol.id;

    let protocolData = ProtocolWeekData.load(weekDataId);
    if (!protocolData) {
        // Make a new one for this ID
        protocolData = new ProtocolWeekData(weekDataId);
        protocolData.protocol = PROTOCOL_ID;
        protocolData.date = weekStartTimestamp;

        // Set defaults
        protocolData.totalSupplyUsd = ZERO_BD;
        protocolData.totalBorrowUsd = ZERO_BD;
        protocolData.totalReservesUsd = ZERO_BD;
        protocolData.utilization = ZERO_BD;
        protocolData.txCount = ZERO_BI;
    }

    const txCount = protocolData.txCount.toBigDecimal();
    const oldValueWeight = txCount.div(txCount.plus(ONE_BD));
    const newValueWeigth = BigDecimal.fromString("1").div(txCount.plus(ONE_BD));

    // Compute averages: newValue = (oldValue*txCount + newValue) / (txCount + 1)
    protocolData.totalSupplyUsd = protocolData.totalSupplyUsd
        .times(oldValueWeight)
        .plus(protocol.totalSupplyUsd.times(newValueWeigth));

    protocolData.totalBorrowUsd = protocolData.totalBorrowUsd
        .times(oldValueWeight)
        .plus(protocol.totalBorrowUsd.times(newValueWeigth));

    protocolData.totalReservesUsd = protocolData.totalReservesUsd
        .times(oldValueWeight)
        .plus(protocol.totalReservesUsd.times(newValueWeigth));

    protocolData.utilization = protocolData.utilization
        .times(oldValueWeight)
        .plus(protocol.utilization.times(newValueWeigth));

    protocolData.txCount = protocolData.txCount.plus(BigInt.fromU32(1));

    protocolData.save();
}
