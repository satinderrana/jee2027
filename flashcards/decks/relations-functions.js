window.DECK_CARDS = [
  // --- Relations ---
  { t:"Relations", f:"Reflexive relation", b:"(a,a) ∈ R for <b>every</b> a in the set A" },
  { t:"Relations", f:"Symmetric relation", b:"(a,b) ∈ R ⇒ (b,a) ∈ R" },
  { t:"Relations", f:"Transitive relation", b:"(a,b) ∈ R and (b,c) ∈ R ⇒ (a,c) ∈ R" },
  { t:"Relations", f:"Equivalence relation", b:"reflexive <b>+</b> symmetric <b>+</b> transitive (all three)" },
  { t:"Relations", f:"Trap: symmetric + transitive but not reflexive", b:"NOT equivalence — all three properties are required independently" },
  { t:"Relations", f:"Number of relations on an n-element set", b:"2<sup>n²</sup>" },
  { t:"Relations", f:"Number of reflexive relations", b:"2<sup>n²−n</sup>" },
  { t:"Relations", f:"Number of symmetric relations", b:"2<sup>n(n+1)/2</sup>" },
  { t:"Relations", f:"Number of equivalence relations (Bell numbers)", b:"n=1 → 1 · n=2 → 2 · n=3 → 5 · n=4 → 15" },

  // --- Functions ---
  { t:"Functions", f:"Definition of a function", b:"every element of the domain maps to <b>exactly one</b> element of the codomain" },
  { t:"Functions", f:"One-one (injective)", b:"f(a)=f(b) ⇒ a=b · horizontal line cuts the graph ≤ once" },
  { t:"Functions", f:"Onto (surjective)", b:"range = codomain (every element of codomain is hit)" },
  { t:"Functions", f:"Bijective", b:"one-one <b>AND</b> onto" },
  { t:"Functions", f:"Many-one", b:"two distinct inputs map to the same output" },
  { t:"Functions", f:"Into (not onto)", b:"range ⊂ codomain (some codomain elements never hit)" },
  { t:"Functions", f:"Number of functions A→B (|A|=n, |B|=m)", b:"m<sup>n</sup>" },
  { t:"Functions", f:"Number of one-one functions A→B", b:"m!/(m−n)! if m ≥ n, else 0" },
  { t:"Functions", f:"Number of onto functions A→B", b:"Σ (−1)<sup>k</sup> C(m,k)(m−k)<sup>n</sup> — or count directly for small sets" },
  { t:"Functions", f:"Number of bijections A→A (|A|=n)", b:"n!" },

  // --- Domain rules ---
  { t:"Domain", f:"Denominator constraint", b:"denominator <b>≠ 0</b>" },
  { t:"Domain", f:"Even root (√, ⁴√)", b:"inside <b>≥ 0</b>" },
  { t:"Domain", f:"log<sub>a</sub>(x) constraints", b:"x &gt; 0 <b>and</b> base a &gt; 0, a ≠ 1" },
  { t:"Domain", f:"Domain of sin⁻¹x and cos⁻¹x", b:"x ∈ [−1, 1]" },
  { t:"Domain", f:"Domain of tan⁻¹x and cot⁻¹x", b:"all real numbers ℝ" },
  { t:"Domain", f:"Domain of sec⁻¹x and cosec⁻¹x", b:"|x| ≥ 1" },
  { t:"Domain", f:"Nested / composite domain", b:"apply each rule to each layer, then <b>intersect</b> every interval" },

  // --- Inverse trig ranges ---
  { t:"Inverse trig", f:"Range of sin⁻¹x", b:"[−π/2, π/2]" },
  { t:"Inverse trig", f:"Range of cos⁻¹x", b:"[0, π]" },
  { t:"Inverse trig", f:"Range of tan⁻¹x", b:"(−π/2, π/2)" },
  { t:"Inverse trig", f:"Range of cosec⁻¹x", b:"[−π/2, π/2] − {0}" },
  { t:"Inverse trig", f:"Range of sec⁻¹x", b:"[0, π] − {π/2}" },
  { t:"Inverse trig", f:"Range of cot⁻¹x", b:"(0, π)" },
  { t:"Inverse trig", f:"Trap: sin⁻¹(sin x) = x", b:"only if x ∈ [−π/2, π/2]; outside, adjust to the principal range" },

  // --- Functional equations ---
  { t:"Functional eq", f:"f(x+y)=f(x)·f(y), f(1)=k", b:"f(n) = k<sup>n</sup> (exponential) · sums become geometric series" },
  { t:"Functional eq", f:"af(x) + bf(1/x) = g(x)", b:"replace x by 1/x → second equation → solve the 2×2 system for f(x)" },
  { t:"Functional eq", f:"f(x) + f(1−x) = k", b:"Σ f(i/n) for i=1..n−1 = (n−1)k/2 (pair terms equidistant from ends)" },
  { t:"Functional eq", f:"f(x+y) = f(x) + f(y) (continuous)", b:"f(x) = kx (linear, Cauchy)" },

  // --- Composition ---
  { t:"Composition", f:"fog(x)", b:"f(g(x)) — apply g first, then f" },
  { t:"Composition", f:"Domain of fog", b:"all x such that g(x) ∈ domain of f" },
  { t:"Composition", f:"(fog)⁻¹", b:"g⁻¹ o f⁻¹ — inverse reverses the order" },
  { t:"Composition", f:"fog vs gof", b:"generally not equal — order matters" },

  // --- Greatest integer ---
  { t:"Greatest integer", f:"[x]", b:"greatest integer ≤ x" },
  { t:"Greatest integer", f:"{x} (fractional part)", b:"x − [x], with 0 ≤ {x} &lt; 1" },
  { t:"Greatest integer", f:"[x] + [−x]", b:"0 if x is an integer, else −1" },
  { t:"Greatest integer", f:"Continuity of [x]", b:"discontinuous at every integer" },

  // --- Range ---
  { t:"Range", f:"Range via monotonicity", b:"find min/max over the domain (derivative or behaviour)" },
  { t:"Range", f:"Range via completing the square", b:"rewrite quadratic in vertex form, read the vertex" },
  { t:"Range", f:"Range of x + 1/x (x > 0)", b:"|f| ≥ 2 (AM-GM), minimum 2 at x = 1" },

  // --- Traps ---
  { t:"Traps", f:"Domain trap #1", b:"forgetting to intersect ALL intervals — the answer is the overlap, not any one interval" },
  { t:"Traps", f:"Domain trap #2", b:"log base must be > 0 and ≠ 1 — not just the argument > 0" },
  { t:"Traps", f:"One-one trap", b:"a one-one function needs the horizontal-line test over its <b>entire</b> domain" },
  { t:"Traps", f:"Counting trap", b:"one-one A→B needs m ≥ n; if m &lt; n, the count is 0, not negative" },
];
