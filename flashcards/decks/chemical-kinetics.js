window.DECK_CARDS = [
  // --- Arrhenius & activation energy ---
  { t:"Arrhenius & Ea", f:"Arrhenius equation", b:"k = A·e<sup>−Ea/RT</sup> — A = pre-exponential (frequency) factor, Ea = activation energy" },
  { t:"Arrhenius & Ea", f:"Arrhenius, logarithmic form", b:"ln k = ln A − Ea/RT" },
  { t:"Arrhenius & Ea", f:"Arrhenius plot (ln k vs 1/T)", b:"straight line · slope = −Ea/R · intercept = ln A" },
  { t:"Arrhenius & Ea", f:"Ea from two rate constants at T₁, T₂", b:"ln(k₂/k₁) = (Ea/R)(1/T₁ − 1/T₂)" },
  { t:"Arrhenius & Ea", f:"ΔH in terms of Ea", b:"ΔH = Ea(forward) − Ea(reverse)" },
  { t:"Arrhenius & Ea", f:"Catalyst lowers Ea by ΔEa → rate change", b:"rate increases by factor e<sup>ΔEa/RT</sup> (catalyst lowers Ea of both forward and reverse equally)" },
  { t:"Arrhenius & Ea", f:"Rule of thumb: 10 °C temperature rise", b:"rate roughly doubles (temperature coefficient ≈ 2–3)" },
  { t:"Arrhenius & Ea", f:"Activation energy (definition)", b:"minimum <b>extra</b> energy over the average energy that reactants must have to react" },

  // --- Order & molecularity ---
  { t:"Order & molecularity", f:"Order of a reaction", b:"sum of the powers of concentration terms in the (experimental) rate law" },
  { t:"Order & molecularity", f:"Molecularity", b:"number of molecules colliding in an elementary step — always 1, 2 or 3 (integer)" },
  { t:"Order & molecularity", f:"Order vs molecularity", b:"order = experimental (0, fraction, negative all possible); molecularity = theoretical (integer only)" },
  { t:"Order & molecularity", f:"Zero-order rate law", b:"rate = k (independent of [reactant])" },
  { t:"Order & molecularity", f:"First-order rate law", b:"rate = k[A]" },
  { t:"Order & molecularity", f:"Second-order rate law", b:"rate = k[A]² or k[A][B]" },
  { t:"Order & molecularity", f:"Pseudo first-order reaction", b:"one reactant in large excess → its concentration stays ≈ constant; e.g. hydrolysis of ester, inversion of cane sugar" },

  // --- Half-life ---
  { t:"Half-life", f:"First-order half-life", b:"t₁/₂ = 0.693/k — <b>independent</b> of initial concentration" },
  { t:"Half-life", f:"Zero-order half-life", b:"t₁/₂ = [A]₀ / 2k — proportional to [A]₀" },
  { t:"Half-life", f:"Second-order half-life", b:"t₁/₂ = 1/(k[A]₀) — inversely proportional to [A]₀" },
  { t:"Half-life", f:"nth-order half-life dependence", b:"t₁/₂ ∝ [A]₀<sup>(1−n)</sup>" },
  { t:"Half-life", f:"Determining order from t₁/₂ vs [A]₀", b:"t₁/₂ independent of [A]₀ → first order · t₁/₂ ∝ [A]₀ → zero · t₁/₂ ∝ 1/[A]₀ → second" },
  { t:"Half-life", f:"After n half-lives", b:"fraction remaining = (1/2)<sup>n</sup>" },
  { t:"Half-life", f:"Radioactive decay", b:"always first order · t₁/₂ = 0.693/λ · ¹⁴C dating uses the (1/2)<sup>n</sup> rule" },

  // --- Integrated rate law ---
  { t:"Integrated rate law", f:"First-order integrated equation", b:"k = (2.303/t)·log([A]₀/[A])" },
  { t:"Integrated rate law", f:"Time for 99% completion (first order)", b:"≈ 6.6 half-lives (remaining 0.01 = (1/2)ⁿ)" },
  { t:"Integrated rate law", f:"Time for a fraction decomposed (first order)", b:"depends only on the log ratio, not [A]₀ — e.g. t(1/8)/t(1/10) = log8/log10 = 0.9" },
  { t:"Integrated rate law", f:"Zero-order integrated form", b:"[A] = [A]₀ − kt" },
  { t:"Integrated rate law", f:"Average rate of reaction", b:"Δ[B]/Δt (product) or −Δ[A]/Δt (reactant)" },
  { t:"Integrated rate law", f:"Rate with stoichiometry", b:"rate = (1/coefficient)·d[ ]/dt — divide by the stoichiometric coefficient" },

  // --- Rate & rate constant ---
  { t:"Rate & rate law", f:"Differential rate law", b:"rate = k[A]<sup>m</sup>[B]<sup>n</sup> — m, n are partial orders, found experimentally" },
  { t:"Rate & rate law", f:"Rate constant k depends on…", b:"temperature only (Arrhenius) — not on concentration" },
  { t:"Rate & rate law", f:"Units of reaction rate", b:"mol L⁻¹ s⁻¹ (concentration per time)" },

  // --- Units of k ---
  { t:"Units of k", f:"Units of k for nth order", b:"(mol L⁻¹)<sup>(1−n)</sup> s⁻¹" },
  { t:"Units of k", f:"Zero-order k units", b:"mol L⁻¹ s⁻¹" },
  { t:"Units of k", f:"First-order k units", b:"s⁻¹" },
  { t:"Units of k", f:"Second-order k units", b:"L mol⁻¹ s⁻¹" },

  // --- Mechanism & RDS ---
  { t:"Mechanism & RDS", f:"Rate-determining step (RDS)", b:"the <b>slowest</b> elementary step — it controls the overall rate" },
  { t:"Mechanism & RDS", f:"Rate law from a mechanism", b:"write rate from the slow step; substitute any intermediate using the fast-equilibrium step" },
  { t:"Mechanism & RDS", f:"Overall order from a mechanism", b:"sum of the orders in the RDS, after substituting intermediates" },
  { t:"Mechanism & RDS", f:"Molecularity of elementary steps", b:"unimolecular (1) · bimolecular (2) · termolecular (3)" },

  // --- Graphs ---
  { t:"Graphs", f:"Zero-order straight-line plot", b:"[A] vs t → straight line, slope = −k" },
  { t:"Graphs", f:"First-order straight-line plot", b:"ln[A] vs t → straight line, slope = −k" },
  { t:"Graphs", f:"Second-order straight-line plot", b:"1/[A] vs t → straight line, slope = +k" },
  { t:"Graphs", f:"Arrhenius plot", b:"ln k vs 1/T → straight line, slope = −Ea/R" },
  { t:"Graphs", f:"Catalyst reaction-profile diagram", b:"lowers the activation peak; reactant and product levels (ΔH) unchanged" },
  { t:"Graphs", f:"Exothermic vs endothermic profile", b:"exothermic: products <b>lower</b> than reactants · endothermic: products <b>higher</b>" },

  // --- Catalyst & collision theory ---
  { t:"Catalyst & collision", f:"Collision-theory rate", b:"rate = P·Z·e<sup>−Ea/RT</sup> — Z = collision frequency, P = steric (orientation) factor" },
  { t:"Catalyst & collision", f:"Steric factor P", b:"fraction of collisions with the correct orientation (0 &lt; P ≤ 1)" },
  { t:"Catalyst & collision", f:"Threshold energy", b:"= Ea + average energy of reactant molecules" },
  { t:"Catalyst & collision", f:"Catalyst does NOT change…", b:"equilibrium constant, ΔH, or ΔG — only the path (lowers Ea)" },
];
