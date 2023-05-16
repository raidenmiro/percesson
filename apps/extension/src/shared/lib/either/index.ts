export function either<L, R>(condition: boolean, left: L, right: R): R | L {
  return condition ? left : right
}
