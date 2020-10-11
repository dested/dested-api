import {SafeFilterQuery, MongoAltQuery, QuerySelector} from './typeSafeFilter';
import {Collection, Decimal128, ObjectId} from 'mongodb';

type RawTypes = number | boolean | string | ObjectId | Decimal128;
type OnlyArrayFieldsKeys<T> = {[key in keyof T]: T[key] extends Array<any> ? key : never}[keyof T];

type OnlyArrayFields<T> = {[key in keyof T]: T[key] extends Array<infer J> ? key : never}[keyof T];

export type UnArray<T> = T extends Array<infer U> ? U : T;
export type ReplaceKey<T, TKey, TValue> = {[key in keyof T]: key extends TKey ? TValue : T[key]};
type DeReferenceExpression<TRef> = TRef extends ExpressionStringReferenceKey<infer TValue>
  ? TValue
  : TRef extends {}
  ? {[key in keyof TRef]: DeReferenceExpression<TRef[key]>}
  : TRef;

type Arrayish<T> = {[key: number]: T} & {arrayish: true};

export type FlattenArray<T> = {
  [key in keyof T]: T[key] extends Array<infer J>
    ? Arrayish<FlattenArray<J>> & FlattenArray<J>
    : T[key] extends ObjectId
    ? T[key]
    : T[key] extends Decimal128
    ? T[key]
    : T[key] extends {}
    ? FlattenArray<T[key]>
    : T[key];
};

export type UnwrapArrayish<T> = T extends Arrayish<infer J> ? J[] : T;

export type UnwrapArrayishObject<T> = {
  [key in keyof T]: T[key] extends Arrayish<infer J>
    ? UnwrapArrayishObject<J>[]
    : T[key] extends {}
    ? UnwrapArrayishObject<T[key]>
    : T[key];
};
type NotImplementedYet = never;

type AllOperators =
  | '$dateToString'
  | '$cond'
  | '$eq'
  | '$map'
  | '$sum'
  | '$abs'
  | '$acos'
  | '$acosh'
  | '$add'
  | '$addToSet'
  | '$allElementsTrue'
  | '$and'
  | '$anyElementTrue'
  | '$arrayElemAt'
  | '$arrayToObject'
  | '$asin'
  | '$asinh'
  | '$atan'
  | '$atan2'
  | '$atanh'
  | '$avg'
  | '$ceil'
  | '$cmp'
  | '$concat'
  | '$concatArrays'
  | '$convert'
  | '$cos'
  | '$dateFromParts'
  | '$dateToParts'
  | '$dateFromString'
  | '$dayOfMonth'
  | '$dayOfWeek'
  | '$dayOfYear'
  | '$degreesToRadians'
  | '$divide'
  | '$exp'
  | '$filter'
  | '$first'
  | '$floor'
  | '$gt'
  | '$gte'
  | '$hour'
  | '$ifNull'
  | '$in'
  | '$indexOfArray'
  | '$indexOfBytes'
  | '$indexOfCP'
  | '$isArray'
  | '$isoDayOfWeek'
  | '$isoWeek'
  | '$isoWeekYear'
  | '$last'
  | '$let'
  | '$literal'
  | '$ln'
  | '$log'
  | '$log10'
  | '$lt'
  | '$lte'
  | '$ltrim'
  | '$max'
  | '$mergeObjects'
  | '$meta'
  | '$min'
  | '$millisecond'
  | '$minute'
  | '$mod'
  | '$month'
  | '$multiply'
  | '$ne'
  | '$not'
  | '$objectToArray'
  | '$or'
  | '$pow'
  | '$push'
  | '$radiansToDegrees'
  | '$range'
  | '$reduce'
  | '$regexFind'
  | '$regexFindAll'
  | '$regexMatch'
  | '$reverseArray'
  | '$round'
  | '$rtrim'
  | '$second'
  | '$setDifference'
  | '$setEquals'
  | '$setIntersection'
  | '$setIsSubset'
  | '$setUnion'
  | '$size'
  | '$sin'
  | '$slice'
  | '$split'
  | '$sqrt'
  | '$stdDevPop'
  | '$stdDevSamp'
  | '$strcasecmp'
  | '$strLenBytes'
  | '$strLenCP'
  | '$substr'
  | '$substrBytes'
  | '$substrCP'
  | '$subtract'
  | '$switch'
  | '$tan'
  | '$toBool'
  | '$toDate'
  | '$toDecimal'
  | '$toDouble'
  | '$toInt'
  | '$toLong'
  | '$toObjectId'
  | '$toString'
  | '$toLower'
  | '$toUpper'
  | '$trim'
  | '$trunc'
  | '$type'
  | '$week'
  | '$year'
  | '$zip';

type InterpretExpressionForceType<TValue, TProjectObject, TOperator extends AllOperators, TForcedType> = LookupKey<
  TValue,
  TOperator
> extends InterpretProjectExpression<infer TOut, TProjectObject>
  ? ProjectResult<TOut> extends TForcedType
    ? InterpretProjectExpression<TOut, TProjectObject>
    : never
  : never;

type InterpretExpressionForceTypeOneDeep<
  TValue,
  TProjectObject,
  TOperator extends AllOperators,
  TOneDeep extends string,
  TForcedType
> = TValue extends InterpretProjectExpression<infer TOut, TProjectObject>
  ? ProjectResult<TOut> extends TForcedType
    ? InterpretProjectExpression<TOut, TProjectObject>
    : never
  : never;

type InterpretOperator<TValue, TProjectObject> = {
  $abs?: InterpretExpressionForceType<TValue, TProjectObject, '$abs', number>;
  $acos?: NotImplementedYet;
  $acosh?: NotImplementedYet;
  $add?: NotImplementedYet;
  $addToSet?: LookupKey<TValue, '$addToSet'> extends InterpretProjectExpression<infer TAddToSet, TProjectObject>
    ? InterpretProjectExpression<TAddToSet, TProjectObject>
    : never;
  $allElementsTrue?: NotImplementedYet;
  $and?: NotImplementedYet;
  $anyElementTrue?: NotImplementedYet;
  $arrayElemAt?: LookupKey<TValue, '$arrayElemAt'> extends [
    InterpretProjectExpression<infer TArray, TProjectObject>,
    InterpretProjectExpression<infer TIndex, TProjectObject>
  ]
    ? [InterpretProjectExpression<TArray, TProjectObject>, InterpretProjectExpression<TIndex, TProjectObject>]
    : never;
  $arrayToObject?: NotImplementedYet;
  $asin?: NotImplementedYet;
  $asinh?: NotImplementedYet;
  $atan?: NotImplementedYet;
  $atan2?: NotImplementedYet;
  $atanh?: NotImplementedYet;
  $avg?: NotImplementedYet;
  $ceil?: NotImplementedYet;
  $cmp?: NotImplementedYet;
  $concat?: LookupKey<TValue, '$concat'> extends InterpretProjectExpression<infer TConcat, TProjectObject>[]
    ? InterpretProjectExpression<TConcat, TProjectObject>[]
    : never;
  $concatArrays?: NotImplementedYet;
  $cond?: LookupKey<TValue, '$cond'> extends {
    else: InterpretProjectExpression<infer TElse, TProjectObject>;
    if: InterpretProjectExpression<infer TIf, TProjectObject>;
    then: InterpretProjectExpression<infer TThen, TProjectObject>;
  }
    ? {
        else: InterpretProjectExpression<TElse, TProjectObject>;
        if: InterpretProjectExpression<TIf, TProjectObject>;
        then: InterpretProjectExpression<TThen, TProjectObject>;
      }
    : never;
  $convert?: NotImplementedYet;
  $cos?: NotImplementedYet;
  $dateFromParts?: NotImplementedYet;
  $dateFromString?: NotImplementedYet;
  $dateToParts?: NotImplementedYet;
  $dateToString?: {
    date: InterpretExpressionForceTypeOneDeep<
      TValue,
      TProjectObject,
      '$dateToString',
      'date',
      Date | FlattenArray<Date>
    >;
    format?: string;
  };
  $dayOfMonth?: NotImplementedYet;
  $dayOfWeek?: NotImplementedYet;
  $dayOfYear?: NotImplementedYet;
  $degreesToRadians?: NotImplementedYet;
  $divide?: NotImplementedYet;

  $eq?: LookupKey<TValue, '$eq'> extends [
    InterpretProjectExpression<infer TLeft, TProjectObject>,
    InterpretProjectExpression<infer TRight, TProjectObject>
  ]
    ? [InterpretProjectExpression<TLeft, TProjectObject>, InterpretProjectExpression<TRight, TProjectObject>]
    : never;
  $exp?: NotImplementedYet;
  $filter?: NotImplementedYet;
  $first?: LookupKey<TValue, '$first'> extends InterpretProjectExpression<infer TFirst, TProjectObject>
    ? InterpretProjectExpression<TFirst, TProjectObject>
    : never;
  $floor?: NotImplementedYet;
  $gt?: NotImplementedYet;
  $gte?: NotImplementedYet;
  $hour?: NotImplementedYet;
  $ifNull?: LookupKey<TValue, '$ifNull'> extends InterpretProjectExpression<infer TIfNull, TProjectObject>[]
    ? InterpretProjectExpression<TIfNull, TProjectObject>[]
    : never;
  $in?: LookupKey<TValue, '$in'> extends InterpretProjectExpression<infer TIn, TProjectObject>
    ? InterpretProjectExpression<TIn, TProjectObject>
    : never;
  $indexOfArray?: NotImplementedYet;
  $indexOfBytes?: NotImplementedYet;
  $indexOfCP?: NotImplementedYet;
  $isArray?: NotImplementedYet;
  $isoDayOfWeek?: NotImplementedYet;
  $isoWeek?: NotImplementedYet;
  $isoWeekYear?: NotImplementedYet;
  $last?: NotImplementedYet;
  $let?: NotImplementedYet;
  $literal?: NotImplementedYet;
  $ln?: NotImplementedYet;
  $log?: NotImplementedYet;
  $log10?: NotImplementedYet;
  $lt?: NotImplementedYet;
  $lte?: NotImplementedYet;
  $ltrim?: NotImplementedYet;
  $map?: LookupKey<TValue, '$map'> extends {
    as: infer TAs;
    in: ProjectObject<infer TIn>;
    input: ExpressionStringKey<infer TInput>;
  }
    ? {as: TAs; in: ProjectObject<TIn>; input: ExpressionStringKey<TInput>}
    : never;
  $max?: NotImplementedYet;
  $mergeObjects?: NotImplementedYet;
  $meta?: NotImplementedYet;
  $millisecond?: NotImplementedYet;
  $min?: InterpretExpressionForceType<TValue, TProjectObject, '$min', number>;
  $minute?: NotImplementedYet;
  $mod?: NotImplementedYet;
  $month?: NotImplementedYet;
  $multiply?: LookupKey<TValue, '$multiply'> extends InterpretProjectExpression<infer TMultiply, TProjectObject>[]
    ? InterpretProjectExpression<TMultiply, TProjectObject>[]
    : never;
  $ne?: NotImplementedYet;
  $not?: NotImplementedYet;
  $objectToArray?: NotImplementedYet;
  $or?: NotImplementedYet;
  $pow?: NotImplementedYet;
  $push?: LookupKey<TValue, '$push'> extends InterpretProjectExpression<infer TPush, TProjectObject>
    ? InterpretProjectExpression<TPush, TProjectObject>
    : never;
  $radiansToDegrees?: NotImplementedYet;
  $range?: NotImplementedYet;
  $reduce?: NotImplementedYet;
  $regexFind?: NotImplementedYet;
  $regexFindAll?: NotImplementedYet;
  $regexMatch?: NotImplementedYet;
  $reverseArray?: NotImplementedYet;
  $round?: NotImplementedYet;
  $rtrim?: NotImplementedYet;
  $second?: NotImplementedYet;
  $setDifference?: NotImplementedYet;
  $setEquals?: NotImplementedYet;
  $setIntersection?: NotImplementedYet;
  $setIsSubset?: NotImplementedYet;
  $setUnion?: NotImplementedYet;
  $sin?: NotImplementedYet;
  $size?: InterpretExpressionForceType<TValue, TProjectObject, '$size', any[]>;
  $slice?: NotImplementedYet;
  $split?: NotImplementedYet;
  $sqrt?: NotImplementedYet;
  $stdDevPop?: NotImplementedYet;
  $stdDevSamp?: NotImplementedYet;
  $strcasecmp?: NotImplementedYet;
  $strLenBytes?: NotImplementedYet;
  $strLenCP?: NotImplementedYet;
  $substr?: NotImplementedYet;
  $substrBytes?: NotImplementedYet;
  $substrCP?: NotImplementedYet;
  $subtract?: LookupKey<TValue, '$subtract'> extends InterpretProjectExpression<infer TSubtract, TProjectObject>[]
    ? InterpretProjectExpression<TSubtract, TProjectObject>[]
    : never;
  $sum?: any /*todo bad InterpretExpressionForceType<TValue, TProjectObject, '$sum', number>*/;
  $switch?: NotImplementedYet;
  $tan?: NotImplementedYet;
  $toBool?: NotImplementedYet;
  $toDate?: NotImplementedYet;
  $toDecimal?: NotImplementedYet;
  $toDouble?: NotImplementedYet;
  $toInt?: NotImplementedYet;
  $toLong?: NotImplementedYet;
  $toLower?: NotImplementedYet;
  $toObjectId?: NotImplementedYet;
  $toString?: NotImplementedYet;
  $toUpper?: NotImplementedYet;
  $trim?: NotImplementedYet;
  $trunc?: NotImplementedYet;
  $type?: NotImplementedYet;
  $week?: NotImplementedYet;
  $year?: NotImplementedYet;
  $zip?: NotImplementedYet;
};

export type InterpretProjectExpression<TValue, TProjectObject> = /*
 */ /*TValue extends ExpressionStringReferenceKey<FlattenArray<infer JA>>
  ? ExpressionStringReferenceKey<JA>
  : */ TValue extends ExpressionStringReferenceKey<
  infer J
>
  ? ExpressionStringReferenceKey<J>
  : TValue extends RawTypes
  ? TValue
  : keyof TValue extends AllOperators
  ? InterpretOperator<TValue, TProjectObject>
  : TValue extends {}
  ? TProjectObject
  : never;

export type ProjectObject<TProject> = {
  [key in keyof TProject]: InterpretProjectExpression<TProject[key], ProjectObject<TProject[key]>>;
};

type AllAccumulateOperators = '$sum' | '$addToSet' | '$first' | '$min' | '$push' | '$arrayElemAt';

type ProjectResult<TValue> = TValue extends ExpressionStringReferenceKey<infer J>
  ? J
  : TValue extends RawTypes
  ? TValue
  : keyof TValue extends AllOperators
  ? LookupKey<
      {
        $abs: number;
        $acos: NotImplementedYet;
        $acosh: NotImplementedYet;
        $add: NotImplementedYet;
        $addToSet: Array<UnwrapArrayish<DeReferenceExpression<LookupKey<TValue, '$addToSet'>>>>;
        $allElementsTrue: NotImplementedYet;
        $and: NotImplementedYet;
        $anyElementTrue: NotImplementedYet;
        $arrayElemAt: UnwrapArrayish<DeReferenceExpression<LookupKey<LookupKey<TValue, '$arrayElemAt'>, 0>>>;
        $arrayToObject: NotImplementedYet;
        $asin: NotImplementedYet;
        $asinh: NotImplementedYet;
        $atan: NotImplementedYet;
        $atan2: NotImplementedYet;
        $atanh: NotImplementedYet;
        $avg: NotImplementedYet;
        $ceil: NotImplementedYet;
        $cmp: NotImplementedYet;
        $concat: string;
        $concatArrays: NotImplementedYet;
        $cond:
          | UnwrapArrayish<DeReferenceExpression<LookupKey<LookupKey<TValue, '$cond'>, 'then'>>>
          | UnwrapArrayish<DeReferenceExpression<LookupKey<LookupKey<TValue, '$cond'>, 'else'>>>;
        $convert: NotImplementedYet;
        $cos: NotImplementedYet;
        $dateFromParts: NotImplementedYet;
        $dateFromString: NotImplementedYet;
        $dateToParts: NotImplementedYet;
        $dateToString: string;
        $dayOfMonth: NotImplementedYet;
        $dayOfWeek: NotImplementedYet;
        $dayOfYear: NotImplementedYet;
        $degreesToRadians: NotImplementedYet;
        $divide: NotImplementedYet;
        $eq: boolean;
        $exp: NotImplementedYet;
        $filter: NotImplementedYet;
        $first: UnwrapArrayish<DeReferenceExpression<LookupKey<TValue, '$first'>>>;
        $floor: NotImplementedYet;
        $gt: NotImplementedYet;
        $gte: NotImplementedYet;
        $hour: NotImplementedYet;
        $ifNull: UnwrapArrayish<DeReferenceExpression<LookupKey<TValue, '$ifNull'>>>;
        $in: DeReferenceExpression<LookupKey<TValue, '$in'>>;
        $indexOfArray: NotImplementedYet;
        $indexOfBytes: NotImplementedYet;
        $indexOfCP: NotImplementedYet;
        $isArray: NotImplementedYet;
        $isoDayOfWeek: NotImplementedYet;
        $isoWeek: NotImplementedYet;
        $isoWeekYear: NotImplementedYet;
        $last: NotImplementedYet;
        $let: NotImplementedYet;
        $literal: NotImplementedYet;
        $ln: NotImplementedYet;
        $log: NotImplementedYet;
        $log10: NotImplementedYet;
        $lt: NotImplementedYet;
        $lte: NotImplementedYet;
        $ltrim: NotImplementedYet;
        $map: UnwrapArrayish<DeReferenceExpression<LookupKey<LookupKey<TValue, '$map'>, 'in'>>>[];
        $max: NotImplementedYet;
        $mergeObjects: NotImplementedYet;
        $meta: NotImplementedYet;
        $millisecond: NotImplementedYet;
        $min: NotImplementedYet;
        $minute: NotImplementedYet;
        $mod: NotImplementedYet;
        $month: NotImplementedYet;
        $multiply: number;
        $ne: NotImplementedYet;
        $not: NotImplementedYet;
        $objectToArray: NotImplementedYet;
        $or: NotImplementedYet;
        $pow: NotImplementedYet;
        $push: NotImplementedYet;
        $radiansToDegrees: NotImplementedYet;
        $range: NotImplementedYet;
        $reduce: NotImplementedYet;
        $regexFind: NotImplementedYet;
        $regexFindAll: NotImplementedYet;
        $regexMatch: NotImplementedYet;
        $reverseArray: NotImplementedYet;
        $round: NotImplementedYet;
        $rtrim: NotImplementedYet;
        $second: NotImplementedYet;
        $setDifference: NotImplementedYet;
        $setEquals: NotImplementedYet;
        $setIntersection: NotImplementedYet;
        $setIsSubset: NotImplementedYet;
        $setUnion: NotImplementedYet;
        $sin: NotImplementedYet;
        $size: number;
        $slice: NotImplementedYet;
        $split: NotImplementedYet;
        $sqrt: NotImplementedYet;
        $stdDevPop: NotImplementedYet;
        $stdDevSamp: NotImplementedYet;
        $strcasecmp: NotImplementedYet;
        $strLenBytes: NotImplementedYet;
        $strLenCP: NotImplementedYet;
        $substr: NotImplementedYet;
        $substrBytes: NotImplementedYet;
        $substrCP: NotImplementedYet;
        $subtract: number;
        $sum: number;
        $switch: NotImplementedYet;
        $tan: NotImplementedYet;
        $toBool: NotImplementedYet;
        $toDate: NotImplementedYet;
        $toDecimal: NotImplementedYet;
        $toDouble: NotImplementedYet;
        $toInt: NotImplementedYet;
        $toLong: NotImplementedYet;
        $toLower: NotImplementedYet;
        $toObjectId: NotImplementedYet;
        $toString: NotImplementedYet;
        $toUpper: NotImplementedYet;
        $trim: NotImplementedYet;
        $trunc: NotImplementedYet;
        $type: NotImplementedYet;
        $week: NotImplementedYet;
        $year: NotImplementedYet;
        $zip: NotImplementedYet;
      },
      keyof TValue
    >
  : TValue extends {}
  ? ProjectObjectResult<TValue>
  : never;

type AccumulateResult<TValue> = TValue extends ExpressionStringReferenceKey<infer J>
  ? J
  : TValue extends RawTypes
  ? TValue
  : keyof TValue extends AllAccumulateOperators
  ? LookupKey<
      {
        $addToSet: UnwrapArrayish<DeReferenceExpression<LookupKey<TValue, '$addToSet'>>>[];
        $first: UnwrapArrayish<DeReferenceExpression<LookupKey<TValue, '$first'>>>;
        $min: number;
        $push: UnwrapArrayish<DeReferenceExpression<LookupKey<TValue, '$push'>>>[];
        $sum: number;
      },
      keyof TValue
    >
  : TValue extends {}
  ? AccumulateObjectResult<TValue>
  : never;

export type ProjectObjectResult<TObj> = {
  [key in keyof TObj]: ProjectResult<TObj[key]>;
};

export type LookupKey<T, TKey> = {[key in keyof T]: key extends TKey ? T[key] : never}[keyof T];

export type InterpretAccumulateExpression<TValue, TProjectObject> = /*
 */ /*TValue extends ExpressionStringReferenceKey<FlattenArray<infer JA>>
  ? ExpressionStringReferenceKey<JA>
  : */ TValue extends ExpressionStringReferenceKey<
  infer J
>
  ? ExpressionStringReferenceKey<J>
  : TValue extends RawTypes
  ? TValue
  : TValue extends {}
  ? TProjectObject
  : keyof TValue extends AllAccumulateOperators
  ? InterpretOperator<TValue, TProjectObject>
  : never;

export type AccumulateObject<TAccumulateObject> = {
  [key in keyof TAccumulateObject]: InterpretAccumulateExpression<
    TAccumulateObject[key],
    AccumulateObject<TAccumulateObject[key]>
  >;
};
export type AccumulateObjectResult<TObj> = {
  [key in keyof TObj]: AccumulateResult<TObj[key]>;
};

export class ExpressionStringKey<TKey> {
  reference: false = false;
  constructor(public value: TKey) {}
}
export class ExpressionStringReferenceKey<TKey> {
  reference: true = true;
  constructor(public value: TKey) {}
}

export class AggregatorLookup<T> {
  operators = {
    $map: <TAsKey extends string, TAsValue, TArrayInput>(
      input: ExpressionStringKey<TArrayInput>,
      as: TAsKey,
      inArg: (agg: AggregatorLookup<{[key in TAsKey]: TArrayInput} & T>) => ProjectObject<TAsValue>
    ): {
      $map: {
        as: typeof as;
        in: ProjectObject<TAsValue>;
        input: typeof input;
      };
    } => {
      return {
        $map: {
          input,
          as,
          in: (inArg(
            new AggregatorLookup<{[key in TAsKey]: TArrayInput} & T>(this.variableLookupLevel + 1)
          ) as unknown) as ProjectObject<TAsValue>,
        },
      };
    },
  };
  protected constructor(protected variableLookupLevel: number) {}

  key<TKey>(query: (t: FlattenArray<T>) => TKey): ExpressionStringKey<TKey> {
    const keyList: PropertyKey[] = [];
    const handler: any = {
      get(target: any, key: PropertyKey): any {
        keyList.push(key);
        return new Proxy({[key]: {}}, handler);
      },
    };
    const proxy = new Proxy({} as FlattenArray<T>, handler);
    query(proxy);
    return keyList.join('.') as any;
  }

  keyFilter<T2>(query: (t: FlattenArray<T>) => T2, value: QuerySelector<MongoAltQuery<T2>>): SafeFilterQuery<T>;
  keyFilter<T2>(query: (t: FlattenArray<T>) => T2, value: MongoAltQuery<T2>): SafeFilterQuery<T> {
    const key = (this.key(query) as unknown) as string;
    return {[key]: value} as any;
  }

  keyLookup<TKey>(query: (t: FlattenArray<T>) => TKey): keyof T {
    return (this.key(query) as unknown) as keyof T;
  }

  referenceKey<TKey>(query: (t: FlattenArray<T>) => TKey): ExpressionStringReferenceKey<TKey> {
    const keyList: PropertyKey[] = [];
    const handler: any = {
      get(target: any, key: PropertyKey, receiver: any): any {
        keyList.push(key);
        return new Proxy({[key]: {}}, handler);
      },
    };
    const proxy = new Proxy({} as FlattenArray<T>, handler);
    query(proxy);

    return (this.lookupLevel() + keyList.join('.')) as any;
  }

  private lookupLevel() {
    let lookup = '';
    for (let i = 0; i < this.variableLookupLevel; i++) {
      lookup += '$';
    }
    return lookup;
  }
}

export class Aggregator<T> extends AggregatorLookup<T> {
  private currentPipeline?: {};

  private constructor(private parent?: Aggregator<any>) {
    super(parent?.variableLookupLevel ?? 1);
    this.variableLookupLevel = parent?.variableLookupLevel ?? 1;
  }

  $addFields<T2>(fields: ProjectObject<T2>): Aggregator<T & ProjectObjectResult<T2>> {
    this.currentPipeline = {$addFields: fields};
    return new Aggregator<T & ProjectObjectResult<T2>>(this);
  }

  $addFieldsCallback<T2>(
    callback: (aggregator: AggregatorLookup<T>) => ProjectObject<T2>
  ): Aggregator<T & ProjectObjectResult<T2>> {
    this.currentPipeline = {$addFields: callback(this)};
    return new Aggregator<T & ProjectObjectResult<T2>>(this);
  }

  $bucket(): Aggregator<T> {
    throw new Error('Not Implemented');
  }
  $bucketAuto(): Aggregator<T> {
    throw new Error('Not Implemented');
  }
  $collStats(): Aggregator<T> {
    throw new Error('Not Implemented');
  }
  $count<TKey extends string>(key: TKey): Aggregator<{[cKey in TKey]: number}> {
    this.currentPipeline = {$count: key};
    return new Aggregator<{[cKey in TKey]: number}>(this);
  }
  $currentOp(): Aggregator<T> {
    throw new Error('Not Implemented');
  }
  $facet(): Aggregator<T> {
    throw new Error('Not Implemented');
  }
  $geoNear(): Aggregator<T> {
    throw new Error('Not Implemented');
  }
  $graphLookup<
    TOther,
    TAs extends string,
    TStartsWith,
    TConnectFromField,
    TConnectToField,
    TDepthField extends string = never
  >(
    callback: (
      aggregator: AggregatorLookup<T>,
      aggregatorLookup: AggregatorLookup<TOther>
    ) => {
      as: TAs;
      collectionName: string;
      connectFromField: ExpressionStringKey<TConnectFromField>;
      connectToField: ExpressionStringKey<TConnectToField>;
      depthField?: TDepthField;
      maxDepth?: number;
      startWith: ExpressionStringReferenceKey<TStartsWith>;
    }
  ): Aggregator<T & {[key in TAs]: (TOther & {[oKey in TDepthField]: number})[]}> {
    this.currentPipeline = {$graphLookup: callback(this, new AggregatorLookup<TOther>(this.variableLookupLevel))};
    return new Aggregator<T & {[key in TAs]: (TOther & {[oKey in TDepthField]: number})[]}>(this);
  }

  $group<TGroupId extends InterpretProjectExpression<any, ProjectObject<any>>, TAccumulator extends {}>(
    callback: (aggregator: AggregatorLookup<T>) => [TGroupId] | [TGroupId, AccumulateObject<TAccumulator>]
  ): Aggregator<ProjectObjectResult<{_id: TGroupId}> & AccumulateObjectResult<TAccumulator>> {
    const result = callback(this);
    this.currentPipeline = {$group: {_id: result[0], ...result[1]}};
    return new Aggregator<ProjectObjectResult<{_id: TGroupId}> & AccumulateObjectResult<TAccumulator>>(this);
  }

  $indexStats(): Aggregator<T> {
    throw new Error('Not Implemented');
  }
  $limit(limit: number): Aggregator<T> {
    this.currentPipeline = {$limit: limit};
    return new Aggregator<T>(this);
  }
  $listLocalSessions(): Aggregator<T> {
    throw new Error('Not Implemented');
  }
  $listSessions(): Aggregator<T> {
    throw new Error('Not Implemented');
  }
  $lookupCallback<TLookupTable, TLocalType, TForeignType extends TLocalType, TAs extends string>(
    callback: (
      aggregator: AggregatorLookup<T>,
      aggregatorLookup: AggregatorLookup<TLookupTable>
    ) => {
      as: TAs;
      foreignField: ExpressionStringKey<TForeignType>;
      from: string;
      localField: ExpressionStringKey<TLocalType>;
    }
  ): Aggregator<T & {[key in TAs]: TLookupTable[]}> {
    const result = callback(this, new AggregatorLookup<TLookupTable>(this.variableLookupLevel));
    this.currentPipeline = {
      $lookup: {
        from: result.from,
        localField: result.localField,
        foreignField: result.foreignField,
        as: result.as,
      },
    };
    return new Aggregator<T & {[key in TAs]: TLookupTable[]}>(this);
  }

  $match(query: SafeFilterQuery<T>): Aggregator<T> {
    this.currentPipeline = {$match: query};
    return new Aggregator<T>(this);
  }

  $matchCallback(callback: (aggregator: AggregatorLookup<T>) => SafeFilterQuery<T>): Aggregator<T> {
    this.currentPipeline = {$match: callback(this)};
    return new Aggregator<T>(this);
  }

  $merge(): Aggregator<T> {
    throw new Error('Not Implemented');
  }
  $out(): Aggregator<T> {
    throw new Error('Not Implemented');
  }
  $planCacheStats(): Aggregator<T> {
    throw new Error('Not Implemented');
  }
  $project<TProject>(query: ProjectObject<TProject>): Aggregator<ProjectObjectResult<TProject>> {
    this.currentPipeline = {$project: query};
    return new Aggregator<ProjectObjectResult<TProject>>(this);
  }
  $projectCallback<TProject>(
    callback: (aggregator: AggregatorLookup<T>) => ProjectObject<TProject>
  ): Aggregator<ProjectObjectResult<TProject>> {
    this.currentPipeline = {$project: callback(this)};
    return new Aggregator<ProjectObjectResult<TProject>>(this);
  }
  $redact(): Aggregator<T> {
    throw new Error('Not Implemented');
  }
  $replaceRoot(): Aggregator<T> {
    throw new Error('Not Implemented');
  }
  $replaceWith(): Aggregator<T> {
    throw new Error('Not Implemented');
  }
  $sample(): Aggregator<T> {
    throw new Error('Not Implemented');
  }
  $set(): Aggregator<T> {
    throw new Error('Not Implemented');
  }
  $skip(skip: number): Aggregator<T> {
    this.currentPipeline = {$skip: skip};
    return new Aggregator<T>(this);
  }
  $sort(sorts: Distribute<T, keyof T, 1 | -1>): Aggregator<T> {
    this.currentPipeline = {$sort: sorts};
    return new Aggregator<T>(this);
  }
  $sortByCount(): Aggregator<T> {
    throw new Error('Not Implemented');
  }
  $sortCallback(callback: (aggregator: AggregatorLookup<T>) => Distribute<T, keyof T, 1 | -1>): Aggregator<T> {
    this.currentPipeline = {$sort: callback(this)};
    return new Aggregator<T>(this);
  }
  $unset(): Aggregator<T> {
    throw new Error('Not Implemented');
  }

  $unwind<TKey extends OnlyArrayFields<T>>(key: TKey): Aggregator<ReplaceKey<T, TKey, UnArray<T[TKey]>>>;

  $unwind<TKey extends keyof T, TKey2 extends OnlyArrayFields<T[TKey]>>(
    key: TKey,
    key2: TKey2
  ): Aggregator<ReplaceKey<T, TKey, ReplaceKey<T[TKey], TKey2, UnArray<T[TKey][TKey2]>>>>;

  $unwind<TKey extends keyof T, TKey2 extends keyof T[TKey], TKey3 extends OnlyArrayFields<T[TKey][TKey2]>>(
    key: TKey,
    key2: TKey2,
    key3: TKey3
  ): Aggregator<
    ReplaceKey<T, TKey, ReplaceKey<T[TKey], TKey2, ReplaceKey<T[TKey][TKey2], TKey3, UnArray<T[TKey][TKey2][TKey3]>>>>
  >;

  $unwind<TKey, TKey2 = undefined, TKey3 = undefined>(key: TKey, key2?: TKey2, key3?: TKey3): any {
    let result = '$';
    result += key;
    if (key2) {
      result += `.${key2}`;
    }
    if (key3) {
      result += `.${key3}`;
    }
    this.currentPipeline = {$unwind: result};
    return new Aggregator<T>(this);
  }

  query(): object[] {
    const pipelines = [];
    if (this.currentPipeline) {
      pipelines.push(this.currentPipeline!);
    }
    let parent = this.parent;
    while (parent) {
      pipelines.push(parent.currentPipeline!);
      parent = parent.parent;
    }
    return pipelines.reverse();
  }

  async result<TDoc extends {_id: ObjectId}>(collection: Collection<TDoc>): Promise<UnwrapArrayishObject<T>[]> {
    console.time('agg');
    const result = await collection
      .aggregate<UnwrapArrayishObject<T>>(this.query(), {allowDiskUse: true})
      .toArray();
    console.timeEnd('agg');
    return result;
  }

  static start<T>(): Aggregator<T> {
    return new Aggregator<T>();
  }
}

type Distribute<T, TKey extends keyof T = keyof T, TOverwrite = T[TKey]> = T extends unknown
  ? {[key in TKey]?: TOverwrite}
  : never;
