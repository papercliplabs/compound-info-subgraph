// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Comptroller extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Comptroller entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Comptroller entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Comptroller", id.toString(), this);
    }
  }

  static load(id: string): Comptroller | null {
    return changetype<Comptroller | null>(store.get("Comptroller", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get priceOracle(): Bytes | null {
    let value = this.get("priceOracle");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set priceOracle(value: Bytes | null) {
    if (!value) {
      this.unset("priceOracle");
    } else {
      this.set("priceOracle", Value.fromBytes(<Bytes>value));
    }
  }

  get closeFactor(): BigInt | null {
    let value = this.get("closeFactor");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set closeFactor(value: BigInt | null) {
    if (!value) {
      this.unset("closeFactor");
    } else {
      this.set("closeFactor", Value.fromBigInt(<BigInt>value));
    }
  }

  get liquidationIncentive(): BigInt | null {
    let value = this.get("liquidationIncentive");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set liquidationIncentive(value: BigInt | null) {
    if (!value) {
      this.unset("liquidationIncentive");
    } else {
      this.set("liquidationIncentive", Value.fromBigInt(<BigInt>value));
    }
  }

  get maxAssets(): BigInt | null {
    let value = this.get("maxAssets");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set maxAssets(value: BigInt | null) {
    if (!value) {
      this.unset("maxAssets");
    } else {
      this.set("maxAssets", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class Market extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("creationBlockNumber", Value.fromBigInt(BigInt.zero()));
    this.set("latestBlockNumber", Value.fromBigInt(BigInt.zero()));
    this.set("cTokenSymbol", Value.fromString(""));
    this.set("cTokenDecimals", Value.fromBigInt(BigInt.zero()));
    this.set("underlyingName", Value.fromString(""));
    this.set("underlyingSymbol", Value.fromString(""));
    this.set("underlyingAddress", Value.fromBytes(Bytes.empty()));
    this.set("underlyingDecimals", Value.fromBigInt(BigInt.zero()));
    this.set("collatoralFactor", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("reserveFactor", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("cash", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("exchangeRate", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("supplyRate", Value.fromBigInt(BigInt.zero()));
    this.set("borrowRate", Value.fromBigInt(BigInt.zero()));
    this.set("supplyApy", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("borrowApy", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalSupplyApy", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalBorrowApy", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalSupply", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalBorrow", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalReserves", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("utalization", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("numberOfSuppliers", Value.fromBigInt(BigInt.zero()));
    this.set("numberOfborrowers", Value.fromBigInt(BigInt.zero()));
    this.set("usdcPerUnderlying", Value.fromBigDecimal(BigDecimal.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Market entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Market entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Market", id.toString(), this);
    }
  }

  static load(id: string): Market | null {
    return changetype<Market | null>(store.get("Market", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get creationBlockNumber(): BigInt {
    let value = this.get("creationBlockNumber");
    return value!.toBigInt();
  }

  set creationBlockNumber(value: BigInt) {
    this.set("creationBlockNumber", Value.fromBigInt(value));
  }

  get latestBlockNumber(): BigInt {
    let value = this.get("latestBlockNumber");
    return value!.toBigInt();
  }

  set latestBlockNumber(value: BigInt) {
    this.set("latestBlockNumber", Value.fromBigInt(value));
  }

  get cTokenSymbol(): string {
    let value = this.get("cTokenSymbol");
    return value!.toString();
  }

  set cTokenSymbol(value: string) {
    this.set("cTokenSymbol", Value.fromString(value));
  }

  get cTokenDecimals(): BigInt {
    let value = this.get("cTokenDecimals");
    return value!.toBigInt();
  }

  set cTokenDecimals(value: BigInt) {
    this.set("cTokenDecimals", Value.fromBigInt(value));
  }

  get underlyingName(): string {
    let value = this.get("underlyingName");
    return value!.toString();
  }

  set underlyingName(value: string) {
    this.set("underlyingName", Value.fromString(value));
  }

  get underlyingSymbol(): string {
    let value = this.get("underlyingSymbol");
    return value!.toString();
  }

  set underlyingSymbol(value: string) {
    this.set("underlyingSymbol", Value.fromString(value));
  }

  get underlyingAddress(): Bytes {
    let value = this.get("underlyingAddress");
    return value!.toBytes();
  }

  set underlyingAddress(value: Bytes) {
    this.set("underlyingAddress", Value.fromBytes(value));
  }

  get underlyingDecimals(): BigInt {
    let value = this.get("underlyingDecimals");
    return value!.toBigInt();
  }

  set underlyingDecimals(value: BigInt) {
    this.set("underlyingDecimals", Value.fromBigInt(value));
  }

  get collatoralFactor(): BigDecimal {
    let value = this.get("collatoralFactor");
    return value!.toBigDecimal();
  }

  set collatoralFactor(value: BigDecimal) {
    this.set("collatoralFactor", Value.fromBigDecimal(value));
  }

  get reserveFactor(): BigDecimal {
    let value = this.get("reserveFactor");
    return value!.toBigDecimal();
  }

  set reserveFactor(value: BigDecimal) {
    this.set("reserveFactor", Value.fromBigDecimal(value));
  }

  get cash(): BigDecimal {
    let value = this.get("cash");
    return value!.toBigDecimal();
  }

  set cash(value: BigDecimal) {
    this.set("cash", Value.fromBigDecimal(value));
  }

  get exchangeRate(): BigDecimal {
    let value = this.get("exchangeRate");
    return value!.toBigDecimal();
  }

  set exchangeRate(value: BigDecimal) {
    this.set("exchangeRate", Value.fromBigDecimal(value));
  }

  get supplyRate(): BigInt {
    let value = this.get("supplyRate");
    return value!.toBigInt();
  }

  set supplyRate(value: BigInt) {
    this.set("supplyRate", Value.fromBigInt(value));
  }

  get borrowRate(): BigInt {
    let value = this.get("borrowRate");
    return value!.toBigInt();
  }

  set borrowRate(value: BigInt) {
    this.set("borrowRate", Value.fromBigInt(value));
  }

  get supplyApy(): BigDecimal {
    let value = this.get("supplyApy");
    return value!.toBigDecimal();
  }

  set supplyApy(value: BigDecimal) {
    this.set("supplyApy", Value.fromBigDecimal(value));
  }

  get borrowApy(): BigDecimal {
    let value = this.get("borrowApy");
    return value!.toBigDecimal();
  }

  set borrowApy(value: BigDecimal) {
    this.set("borrowApy", Value.fromBigDecimal(value));
  }

  get totalSupplyApy(): BigDecimal {
    let value = this.get("totalSupplyApy");
    return value!.toBigDecimal();
  }

  set totalSupplyApy(value: BigDecimal) {
    this.set("totalSupplyApy", Value.fromBigDecimal(value));
  }

  get totalBorrowApy(): BigDecimal {
    let value = this.get("totalBorrowApy");
    return value!.toBigDecimal();
  }

  set totalBorrowApy(value: BigDecimal) {
    this.set("totalBorrowApy", Value.fromBigDecimal(value));
  }

  get totalSupply(): BigDecimal {
    let value = this.get("totalSupply");
    return value!.toBigDecimal();
  }

  set totalSupply(value: BigDecimal) {
    this.set("totalSupply", Value.fromBigDecimal(value));
  }

  get totalBorrow(): BigDecimal {
    let value = this.get("totalBorrow");
    return value!.toBigDecimal();
  }

  set totalBorrow(value: BigDecimal) {
    this.set("totalBorrow", Value.fromBigDecimal(value));
  }

  get totalReserves(): BigDecimal {
    let value = this.get("totalReserves");
    return value!.toBigDecimal();
  }

  set totalReserves(value: BigDecimal) {
    this.set("totalReserves", Value.fromBigDecimal(value));
  }

  get utalization(): BigDecimal {
    let value = this.get("utalization");
    return value!.toBigDecimal();
  }

  set utalization(value: BigDecimal) {
    this.set("utalization", Value.fromBigDecimal(value));
  }

  get numberOfSuppliers(): BigInt {
    let value = this.get("numberOfSuppliers");
    return value!.toBigInt();
  }

  set numberOfSuppliers(value: BigInt) {
    this.set("numberOfSuppliers", Value.fromBigInt(value));
  }

  get numberOfborrowers(): BigInt {
    let value = this.get("numberOfborrowers");
    return value!.toBigInt();
  }

  set numberOfborrowers(value: BigInt) {
    this.set("numberOfborrowers", Value.fromBigInt(value));
  }

  get usdcPerUnderlying(): BigDecimal {
    let value = this.get("usdcPerUnderlying");
    return value!.toBigDecimal();
  }

  set usdcPerUnderlying(value: BigDecimal) {
    this.set("usdcPerUnderlying", Value.fromBigDecimal(value));
  }

  get historicalHourData(): Array<string> {
    let value = this.get("historicalHourData");
    return value!.toStringArray();
  }

  set historicalHourData(value: Array<string>) {
    this.set("historicalHourData", Value.fromStringArray(value));
  }

  get historicalDayData(): Array<string> {
    let value = this.get("historicalDayData");
    return value!.toStringArray();
  }

  set historicalDayData(value: Array<string>) {
    this.set("historicalDayData", Value.fromStringArray(value));
  }

  get historicalWeekData(): Array<string> {
    let value = this.get("historicalWeekData");
    return value!.toStringArray();
  }

  set historicalWeekData(value: Array<string>) {
    this.set("historicalWeekData", Value.fromStringArray(value));
  }
}

export class MarketHourData extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("market", Value.fromString(""));
    this.set("date", Value.fromBigInt(BigInt.zero()));
    this.set("supplyApy", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("borrowApy", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalSupplyApy", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalBorrowApy", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalSupply", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalBorrow", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalReserves", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("utalization", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("txCount", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save MarketHourData entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save MarketHourData entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("MarketHourData", id.toString(), this);
    }
  }

  static load(id: string): MarketHourData | null {
    return changetype<MarketHourData | null>(store.get("MarketHourData", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get market(): string {
    let value = this.get("market");
    return value!.toString();
  }

  set market(value: string) {
    this.set("market", Value.fromString(value));
  }

  get date(): BigInt {
    let value = this.get("date");
    return value!.toBigInt();
  }

  set date(value: BigInt) {
    this.set("date", Value.fromBigInt(value));
  }

  get supplyApy(): BigDecimal {
    let value = this.get("supplyApy");
    return value!.toBigDecimal();
  }

  set supplyApy(value: BigDecimal) {
    this.set("supplyApy", Value.fromBigDecimal(value));
  }

  get borrowApy(): BigDecimal {
    let value = this.get("borrowApy");
    return value!.toBigDecimal();
  }

  set borrowApy(value: BigDecimal) {
    this.set("borrowApy", Value.fromBigDecimal(value));
  }

  get totalSupplyApy(): BigDecimal {
    let value = this.get("totalSupplyApy");
    return value!.toBigDecimal();
  }

  set totalSupplyApy(value: BigDecimal) {
    this.set("totalSupplyApy", Value.fromBigDecimal(value));
  }

  get totalBorrowApy(): BigDecimal {
    let value = this.get("totalBorrowApy");
    return value!.toBigDecimal();
  }

  set totalBorrowApy(value: BigDecimal) {
    this.set("totalBorrowApy", Value.fromBigDecimal(value));
  }

  get totalSupply(): BigDecimal {
    let value = this.get("totalSupply");
    return value!.toBigDecimal();
  }

  set totalSupply(value: BigDecimal) {
    this.set("totalSupply", Value.fromBigDecimal(value));
  }

  get totalBorrow(): BigDecimal {
    let value = this.get("totalBorrow");
    return value!.toBigDecimal();
  }

  set totalBorrow(value: BigDecimal) {
    this.set("totalBorrow", Value.fromBigDecimal(value));
  }

  get totalReserves(): BigDecimal {
    let value = this.get("totalReserves");
    return value!.toBigDecimal();
  }

  set totalReserves(value: BigDecimal) {
    this.set("totalReserves", Value.fromBigDecimal(value));
  }

  get utalization(): BigDecimal {
    let value = this.get("utalization");
    return value!.toBigDecimal();
  }

  set utalization(value: BigDecimal) {
    this.set("utalization", Value.fromBigDecimal(value));
  }

  get txCount(): BigInt {
    let value = this.get("txCount");
    return value!.toBigInt();
  }

  set txCount(value: BigInt) {
    this.set("txCount", Value.fromBigInt(value));
  }
}

export class MarketDayData extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("market", Value.fromString(""));
    this.set("date", Value.fromBigInt(BigInt.zero()));
    this.set("supplyApy", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("borrowApy", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalSupplyApy", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalBorrowApy", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalSupply", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalBorrow", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalReserves", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("utalization", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("txCount", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save MarketDayData entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save MarketDayData entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("MarketDayData", id.toString(), this);
    }
  }

  static load(id: string): MarketDayData | null {
    return changetype<MarketDayData | null>(store.get("MarketDayData", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get market(): string {
    let value = this.get("market");
    return value!.toString();
  }

  set market(value: string) {
    this.set("market", Value.fromString(value));
  }

  get date(): BigInt {
    let value = this.get("date");
    return value!.toBigInt();
  }

  set date(value: BigInt) {
    this.set("date", Value.fromBigInt(value));
  }

  get supplyApy(): BigDecimal {
    let value = this.get("supplyApy");
    return value!.toBigDecimal();
  }

  set supplyApy(value: BigDecimal) {
    this.set("supplyApy", Value.fromBigDecimal(value));
  }

  get borrowApy(): BigDecimal {
    let value = this.get("borrowApy");
    return value!.toBigDecimal();
  }

  set borrowApy(value: BigDecimal) {
    this.set("borrowApy", Value.fromBigDecimal(value));
  }

  get totalSupplyApy(): BigDecimal {
    let value = this.get("totalSupplyApy");
    return value!.toBigDecimal();
  }

  set totalSupplyApy(value: BigDecimal) {
    this.set("totalSupplyApy", Value.fromBigDecimal(value));
  }

  get totalBorrowApy(): BigDecimal {
    let value = this.get("totalBorrowApy");
    return value!.toBigDecimal();
  }

  set totalBorrowApy(value: BigDecimal) {
    this.set("totalBorrowApy", Value.fromBigDecimal(value));
  }

  get totalSupply(): BigDecimal {
    let value = this.get("totalSupply");
    return value!.toBigDecimal();
  }

  set totalSupply(value: BigDecimal) {
    this.set("totalSupply", Value.fromBigDecimal(value));
  }

  get totalBorrow(): BigDecimal {
    let value = this.get("totalBorrow");
    return value!.toBigDecimal();
  }

  set totalBorrow(value: BigDecimal) {
    this.set("totalBorrow", Value.fromBigDecimal(value));
  }

  get totalReserves(): BigDecimal {
    let value = this.get("totalReserves");
    return value!.toBigDecimal();
  }

  set totalReserves(value: BigDecimal) {
    this.set("totalReserves", Value.fromBigDecimal(value));
  }

  get utalization(): BigDecimal {
    let value = this.get("utalization");
    return value!.toBigDecimal();
  }

  set utalization(value: BigDecimal) {
    this.set("utalization", Value.fromBigDecimal(value));
  }

  get txCount(): BigInt {
    let value = this.get("txCount");
    return value!.toBigInt();
  }

  set txCount(value: BigInt) {
    this.set("txCount", Value.fromBigInt(value));
  }
}

export class MarketWeekData extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("market", Value.fromString(""));
    this.set("date", Value.fromBigInt(BigInt.zero()));
    this.set("supplyApy", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("borrowApy", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalSupplyApy", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalBorrowApy", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalSupply", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalBorrow", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalReserves", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("utalization", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("txCount", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save MarketWeekData entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save MarketWeekData entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("MarketWeekData", id.toString(), this);
    }
  }

  static load(id: string): MarketWeekData | null {
    return changetype<MarketWeekData | null>(store.get("MarketWeekData", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get market(): string {
    let value = this.get("market");
    return value!.toString();
  }

  set market(value: string) {
    this.set("market", Value.fromString(value));
  }

  get date(): BigInt {
    let value = this.get("date");
    return value!.toBigInt();
  }

  set date(value: BigInt) {
    this.set("date", Value.fromBigInt(value));
  }

  get supplyApy(): BigDecimal {
    let value = this.get("supplyApy");
    return value!.toBigDecimal();
  }

  set supplyApy(value: BigDecimal) {
    this.set("supplyApy", Value.fromBigDecimal(value));
  }

  get borrowApy(): BigDecimal {
    let value = this.get("borrowApy");
    return value!.toBigDecimal();
  }

  set borrowApy(value: BigDecimal) {
    this.set("borrowApy", Value.fromBigDecimal(value));
  }

  get totalSupplyApy(): BigDecimal {
    let value = this.get("totalSupplyApy");
    return value!.toBigDecimal();
  }

  set totalSupplyApy(value: BigDecimal) {
    this.set("totalSupplyApy", Value.fromBigDecimal(value));
  }

  get totalBorrowApy(): BigDecimal {
    let value = this.get("totalBorrowApy");
    return value!.toBigDecimal();
  }

  set totalBorrowApy(value: BigDecimal) {
    this.set("totalBorrowApy", Value.fromBigDecimal(value));
  }

  get totalSupply(): BigDecimal {
    let value = this.get("totalSupply");
    return value!.toBigDecimal();
  }

  set totalSupply(value: BigDecimal) {
    this.set("totalSupply", Value.fromBigDecimal(value));
  }

  get totalBorrow(): BigDecimal {
    let value = this.get("totalBorrow");
    return value!.toBigDecimal();
  }

  set totalBorrow(value: BigDecimal) {
    this.set("totalBorrow", Value.fromBigDecimal(value));
  }

  get totalReserves(): BigDecimal {
    let value = this.get("totalReserves");
    return value!.toBigDecimal();
  }

  set totalReserves(value: BigDecimal) {
    this.set("totalReserves", Value.fromBigDecimal(value));
  }

  get utalization(): BigDecimal {
    let value = this.get("utalization");
    return value!.toBigDecimal();
  }

  set utalization(value: BigDecimal) {
    this.set("utalization", Value.fromBigDecimal(value));
  }

  get txCount(): BigInt {
    let value = this.get("txCount");
    return value!.toBigInt();
  }

  set txCount(value: BigInt) {
    this.set("txCount", Value.fromBigInt(value));
  }
}