export function either<C extends boolean, L, R>(condition: C, left: L, right: R): L | R {
  return condition ? left : right
}
