const formulas = [
  "∇θ L(θ)", "P(y | x)", "z = Wx + b", "σ²", "R²", "cos(u,v)", "uᵀv",
  "QKᵀ / √d", "softmax(QKᵀ / √d)V", "cos(e_q,e_d)", "P(xₜ | x<t)",
  "ŷ = fθ(x)", "argmaxᵧ P(y | x)", "Σᵢ wᵢxᵢ", "L = −Σ y log p",
];

export function FormulaFragment({ index }: { index: number }) {
  return <span className="ambient-formula">{formulas[index % formulas.length]}</span>;
}
