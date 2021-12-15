# HTML

## <meta />

### http-equiv="X-UA-Compatible"

- X-UA-Compatible 是自从 IE8 新加的一个设置，对于 IE8 以下的浏览器是不识别的。通过在 meta 中设置 X-UA-Compatible 的值，可以指定网页的兼容性模式设置。
- <meta http-equiv="X-UA-Compatible" content="IE=7" /> 无论是否用DTD声明文档标准，IE8/9都会以IE7引擎来渲染页面
- <meta http-equiv="x-ua-compatible" content="IE=8" /> 告诉IE浏览器，IE8/9都会以IE8引擎来渲染页面
- <meta http-equiv="X-UA-Compatible" content="IE=edge" /> 告诉IE浏览器，IE8/9及以后的版本都会以最高版本IE来渲染页面
- <meta http-equiv="X-UA-Compatible" content="IE=7,IE=9">
- <meta http-equiv="X-UA-Compatible" content="IE=7,9" />
- 注意：根据官网定义 X-UA-compatible 标头不区分大小写；不过，它必须显示在网页中除 title 元素和其他 meta 元素以外的所有其他元素之前。如果不是的话，它不起作用

### name="viewport"

- 示例：<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no " />
- width：控制 viewport 的大小，可以指定的一个值，如果 600，或者特殊的值，如 device-width 为设备的宽度（单位为缩放为 100% 时的 CSS 的像素）。
- initial-scale：初始缩放比例，也即是当页面第一次 load 的时候缩放比例。
- maximum-scale：允许用户缩放到的最大比例。
- minimum-scale：允许用户缩放到的最小比例。
- user-scalable：用户是否可以手动缩放
- height：和 width 相对应，指定高度, 很少使用。

## 符号

### HTML 中的特殊符号

特殊符号 命名实体 十进制编码 特殊符号 命名实体 十进制编码 特殊符号 命名实体 十进制编码
Α &Alpha; &#913; Β &Beta; &#914; Γ &Gamma; &#915;
Δ &Delta; &#916; Ε &Epsilon; &#917; Ζ &Zeta; &#918;
Η &Eta; &#919; Θ &Theta; &#920; Ι &Iota; &#921;
Κ &Kappa; &#922; Λ &Lambda; &#923; Μ &Mu; &#924;
Ν &Nu; &#925; Ξ &Xi; &#926; Ο &Omicron; &#927;
Π &Pi; &#928; Ρ &Rho; &#929; Σ &Sigma; &#931;
Τ &Tau; &#932; Υ &Upsilon; &#933; Φ &Phi; &#934;
Χ &Chi; &#935; Ψ &Psi; &#936; Ω &Omega; &#937;
α &alpha; &#945; β &beta; &#946; γ &gamma; &#947;
δ &delta; &#948; ε &epsilon; &#949; ζ &zeta; &#950;
η &eta; &#951; θ &theta; &#952; ι &iota; &#953;
κ &kappa; &#954; λ &lambda; &#955; μ &mu; &#956;
ν &nu; &#957; ξ &xi; &#958; ο &omicron; &#959;
π &pi; &#960; ρ &rho; &#961; ς &sigmaf; &#962;
σ &sigma; &#963; τ &tau; &#964; υ &upsilon; &#965;
φ &phi; &#966; χ &chi; &#967; ψ &psi; &#968;
ω &omega; &#969; ϑ &thetasym; &#977; ϒ &upsih; &#978;
ϖ &piv; &#982; • &bull; &#8226; … &hellip; &#8230;
′ &prime; &#8242; ″ &Prime; &#8243; ‾ &oline; &#8254;
⁄ &frasl; &#8260; ℘ &weierp; &#8472; ℑ &image; &#8465;
ℜ &real; &#8476; ™ &trade; &#8482; ℵ &alefsym; &#8501;
← &larr; &#8592; ↑ &uarr; &#8593; → &rarr; &#8594;
↓ &darr; &#8595; ↔ &harr; &#8596; ↵ &crarr; &#8629;
⇐ &lArr; &#8656; ⇑ &uArr; &#8657; ⇒ &rArr; &#8658;
⇓ &dArr; &#8659; ⇔ &hArr; &#8660; ∀ &forall; &#8704;
∂ &part; &#8706; ∃ &exist; &#8707; ∅ &empty; &#8709;
∇ &nabla; &#8711; ∈ &isin; &#8712; ∉ &notin; &#8713;
∋ &ni; &#8715; ∏ &prod; &#8719; ∑ &sum; &#8722;
− &minus; &#8722; ∗ &lowast; &#8727; √ &radic; &#8730;
∝ &prop; &#8733; ∞ &infin; &#8734; ∠ &ang; &#8736;
∧ &and; &#8869; ∨ &or; &#8870; ∩ &cap; &#8745;
∪ &cup; &#8746; ∫ &int; &#8747; ∴ &there4; &#8756;
∼ &sim; &#8764; ≅ &cong; &#8773; ≈ &asymp; &#8773;
≠ &ne; &#8800; ≡ &equiv; &#8801; ≤ &le; &#8804;
≥ &ge; &#8805; ⊂ &sub; &#8834; ⊃ &sup; &#8835;
⊄ &nsub; &#8836; ⊆ &sube; &#8838; ⊇ &supe; &#8839;
⊕ &oplus; &#8853; ⊗ &otimes; &#8855; ⊥ &perp; &#8869;
⋅ &sdot; &#8901; ⌈ &lceil; &#8968; ⌉ &rceil; &#8969;
⌊ &lfloor; &#8970; ⌋ &rfloor; &#8971; ◊ &loz; &#9674;
♠ &spades; &#9824; ♣ &clubs; &#9827; ♥ &hearts; &#9829;
♦ &diams; &#9830; &nbsp; &#160; ¡ &iexcl; &#161;
¢ &cent; &#162; £ &pound; &#163; ¤ &curren; &#164;
¥ &yen; &#165; ¦ &brvbar; &#166; § &sect; &#167;
¨ &uml; &#168; © &copy; &#169; ª &ordf; &#170;
« &laquo; &#171; ¬ &not; &#172; ­ &shy; &#173;
® &reg; &#174; ¯ &macr; &#175; ° &deg; &#176;
± &plusmn; &#177; ² &sup2; &#178; ³ &sup3; &#179;
´ &acute; &#180; µ &micro; &#181 " &quot; &#34;
< &lt; &#60; > &gt; &#62; ' &#39;

---
