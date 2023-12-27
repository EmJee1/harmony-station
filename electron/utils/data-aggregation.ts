import { omit, pick } from './object'

type GroupByResult<
  TData extends object,
  TGroupBy extends keyof TData,
  TGroupName extends string,
  TKeysInGroup extends keyof TData,
> = Omit<TData, TKeysInGroup> &
  Record<TGroupName, Pick<TData, TKeysInGroup>[]> &
  Record<TGroupBy, TData[TGroupBy]>

/**
 * Groups an array of objects by a specified key, creating a new array of grouped objects.
 * @example
 * const data = [
 *   { id: 1, category: 'A', value: 10 },
 *   { id: 2, category: 'B', value: 20 },
 *   { id: 3, category: 'A', value: 30 },
 *   { id: 4, category: 'B', value: 40 },
 * ];
 *
 * const result = groupBy(data, 'category', 'groupedItems', ['id', 'value']);
 * // Result:
 * // [
 * //   { category: 'A', groupedItems: [{ id: 1, value: 10 }, { id: 3, value: 30 }] },
 * //   { category: 'B', groupedItems: [{ id: 2, value: 20 }, { id: 4, value: 40 }] },
 * // ]
 */
export function groupBy<
  TData extends object,
  TGroupBy extends keyof TData,
  TGroupName extends string,
  TKeysInGroup extends keyof TData,
>(
  data: TData[],
  groupBy: TGroupBy,
  groupName: TGroupName,
  keysInGroup: TKeysInGroup[]
) {
  return data.reduce<
    GroupByResult<TData, TGroupBy, TGroupName, TKeysInGroup>[]
  >((acc, currentValue) => {
    let currentIndex = acc.findIndex(
      item => item[groupBy] === currentValue[groupBy]
    )

    if (currentIndex === -1) {
      const rootItem = omit(currentValue, keysInGroup)

      // TODO: remove the type assertion
      // The type assertion is needed because TS infers the array as a never[]
      const newGroupedResult = {
        ...rootItem,
        [groupBy]: currentValue[groupBy],
        [groupName]: [],
      } as GroupByResult<TData, TGroupBy, TGroupName, TKeysInGroup>

      currentIndex = acc.push(newGroupedResult) - 1
    }

    const groupItem = pick(currentValue, keysInGroup)
    acc[currentIndex][groupName].push(groupItem)

    return acc
  }, [])
}
