describe('Example Component', () => {
  test('Debe de ser mayor a 10', () => {
    // Arreglar
    let value = 5

    // Actuar
    value += 2

    // Observar el resultado
    expect(value).toBeGreaterThan(10)
  })
})