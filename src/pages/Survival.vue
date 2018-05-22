<template>
  <section class="reading-size-adjust">
    <h1>Survival guide</h1>
    <p>
      Tohle je rychlá příručka od Bio-senpai, díky které se vaše šance na přežití české anime apokalypsy zvýší o 300 procent.
    </p>
    <p class="highlight-block">
      Text je, tak jako všechny tady u nás, pojatý s jistou mírou nadsázky. Při čtení myslete na to, že jsme jen banda nekvalifikovaných cvoků a nic, co je tu napsáno, nemůžete brát jako zaručená fakta! Pokud chcete jít hlouběji, pokračujte i na <strong>reference</strong> v textu a <strong>zkoumejte nezávisle</strong>. Nevěřte nikomu.
    </p>

    <h3 class="block-title">Obsah</h3>
    <div class="toc highlight-block">
      <ol class="hlist">
        <li><a @click.prevent="scrollTo('co-se-deje')" href="#co-se-deje">Co se děje</a></li>
        <li><a @click.prevent="scrollTo('nas-stav')" href="#nas-stav">Náš stav</a></li>
        <li><a @click.prevent="scrollTo('co-delat')" href="#co-delat">Co dělat</a>
          <ol>
            <li><a @click.prevent="scrollTo('video')" href="#video">Jak sehnat video</a></li>
            <li><a @click.prevent="scrollTo('prehrani')" href="#prehrani">Jak přidat titulky</a></li>
          </ol>
        </li>
        <li><a @click.prevent="scrollTo('pokrocile-taktiky')" href="#pokrocile-taktiky">Pokročilé taktiky</a>
          <ol>
            <li><a @click.prevent="scrollTo('nouzove-video')" href="#nouzove-video">Nouzové video</a></li>
            <li><a @click.prevent="scrollTo('prelepovani')" href="#prelepovani">Přelepování</a></li>
          </ol>
        </li>
      </ol>
    </div>

    <h2 class="chap" id="co-se-deje" ref="co-se-deje">Co se děje</h2>
    <cl-image 
      src="mascot-ng/notes" 
      width="200" 
      :params=" {transformation: [
                  {angle: 'hflip'},
                  {angle: 3}
                ]}"
      class="deco"></cl-image>
    <p>
      Pokud čtete tuhle příručku, asi jste si už všimli, že z českého internetu postupně vymizela asi všechna videa přeložených anime, o streamování ani nemluvě. Původcem celého toho šílenství se zdají být, jak už to tak bývá, nesčetná upozornění na porušování autorských práv namířených na naší skromnou komunitu. Ty nejsou nic nového, ale tentokrát podle všeho přituhuje dost na to, aby se celá Akihabara, kterou možná znáte jakožto jeden z těch větších otaku portálů, zbláznila a začala mazat veškeré důkazy.<a href="https://forum.akihabara.cz/index.php?topic=5356.0" class="ref">A</a> Samozřejmě můžete namítnout, že takových věcí ohledně pirátství už tu byla spousta, ale nikomu se nechce platit nereálně vysoké pokuty nebo si jít posedět na pár let se zaručeně příjemnými spolubydlícími. A to i kdyby šance, že k tomu dojde, byla jakkoliv malá.
    </p>
    <p>
      Co se změnilo oproti dřívějšku? Možná že nic. Tak do hloubky tu nebudeme zacházet, ale určitě najdete vhodné zdroje, kde se dozvíte mnohem více. Každopádně ano, zmíněné věci zmizeli i z Bio-senpai. Můžete s tím souhlasit nebo nemusíte, ale je to tak. Pokud se situace časem uklidní (pokud je vůbec co uklidňovat), mohou se videa a streamy opět objevit, ale určitě to říci nelze.
    </p>
    <p class="highlight-block">
      Chtěli bychom teď narychlo odbočit. Asi vám neuniknul humbuk okolo <strong>GDPR</strong>. Pro ujasnění, GDPR se týká osobních údajů uživatelů. S vyhlazením anime titulkářů tedy nesouvisí a nemusíte kvůli tomu na něj nadávat. Kvůli všemu čeho se ale dotýká, prosíme, nadávejte dál, pokud nadáváte.
    </p>
    <p>
      Věděli jste, že normální člověk doma nekrájí hrozen? Ne proto, že to tu je napsáno, ale protože na to nemá v životě čas. A už vůbec nemá čas ze sebe dělat amatérského právníka. Zkoumat, co je a co není v EU trestný čin v tomto ohledu a jaký zákon se kde vyrojil, to je jako krájet hrozen. Pokud se chcete ponořit přímo do zdroje vší paniky, můžete si pročíst některá vlákna na Aki.<a href="https://forum.akihabara.cz/index.php?topic=5344.0" class="ref">B</a> Komu budete věřit je na vás.
    </p>

    <h2 class="chap" id="nas-stav" ref="nas-stav">Náš stav</h2>
    <p>
      U nás jsme se nakonec dohodli přistoupit na hru Akihabary a zpřístupňovat jen externí titulky. Z části proto, abychom u nich mohli i nadále propagovat naše nezaměnitelně pomalé překlady. Z části proto, že (kromě Cerxe) nehodláme být rebelové a věčně myslet na možnost dovolené v jistém zařízení, ať už je pravděpodobnost jakkoliv malá. O tom už jsme psali výše. 
    </p>
    <p class="highlight-block">
      Rozhodně ale nehodláme zahodit všechnu dosud odvedenou neplacenou a dobrovonou práci. Takže pokud se nestane něco tak děsivého, aby nám to změnilo názor, tak externí titulky u nás najdete stále.
    </p>

    <h2 class="chap" id="co-delat" ref="co-delat">Co dělat</h2>
    <p>
      Teď už konečně k té příručkové části příručky. Samozřejmě, pokud některý krok již máte za sebou nebo se vás netýká, prostě ho přeskočte. Nebo překročte, haha. Budeme se tu dotýkat i těch základních věcí, které už byly k vidění ve FAQ.
    </p>

    <h3 class="sub" id="video" ref="video">Jak sehnat video</h3>
    <p>
      U našich překladů uvádíme, odkud se původně vzaly a tedy na které vydání (release, chete-li) sedí časování titulků. Vaše mise, pokud se ji rozhodnete přijmout, bude vyhledat web skupiny, která vydala námi přeložený materiál a u nich pak pokračovat k žádaným souborům. Budete muset konfrontovat cizojazyčné weby, ale to určitě zvládnete. Není to věda.
    </p>
    <p>
      Alternativní plán bude vyhledat jejich vydání na některém z torrent trackerů, pokud možno zaměřených přímo na anime. Pokud ani jeden z těchto plánů nebyl úspěšný, vizte pokročilé taktikty pro shánění videa.
    </p>

    <h3 class="sub" id="prehrani" ref="prehrani">Jak přidat titulky</h3>
    <p>
      Pokud již máte video i náš překlad, je na čase začít sledovat. Vaše mise nyní bude použít přehrávač, který dokáže k videu otevřít externí titulky. To jich zvládne hodně, ale většinou ne ty předinstalované. Další hodící se vlastností by mohla být úprava časování titulků. To využijete, když dojde na nejhorší a seženete jen jinak sedící vydání. Klasický kandidát, o kterém asi uslyšíte všude, je VLC.<a href="https://www.videolan.org/vlc/" class="ref">C</a>
    </p>

    <h2 class="chap" id="pokrocile-taktiky" ref="pokrocile-taktiky">Pokročilé taktiky</h2>
    <p>
      Když selžou běžné taktiky, budete se možná muset smířit s kompromisy. Sami ale víme, jak zdlouhavé a otravné bylo shánění některých našich zdrojů. Pokud nechcete naše titulky přelepovat přes nějaký hardsub, dejte tomu hledání ještě chvilku. Třeba nakonec následující rady nebudete vůbec potřebovat.
    </p>
    <p class="highlight-block">
      Následující už bude vyžadovat trochu víc práce, ale nevzdávejte to. Musíte to přece vidět.
    </p>

    <h3 class="sub" id="nouzove-video" ref="nouzove-video">Nouzové video</h3>
    <p>
      Někdy se může stát, že vydání, které potřebujete, prostě nikde není k sehnání. Nejméně bolestivou alternativou je sehnat video od jiné skupiny nebo raw, tedy originální video úplně bez titulků. Problémem může být nesedící časování. Samozřejmě, že obsah bude stejný, ale mezi vydáními mohou být rozdíly. Někde chybí sponzoři po úvodních titulcích, někde ne. Vteřinka sem, vteřinka tam, ale to bohatě stačí na zešílení z &bdquo;křivých&ldquo; titulků. V takovém případě budete časování muset posunout ve vašem přehrávači, jak se říká &bdquo;od oka.&ldquo;
    </p>
    <p>
      Pokud k některé sérii nebo filmu seženete jen cizojazyčný hardsub, tedy video s vypálenými titulky do obrazu, může to vypadat jako úplný konec. Ale pořád je naděje. Čtěte dál.
    </p>

    <h3 class="sub" id="prelepovani" ref="prelepovani">Přelepování</h3>
    <p>
      Zoufalá taktika, ale ne tak nepříjemná na oči, jak by se mohla zdát. Pokud jediné, co jste našli, byl nějaký španělský hardsub, bude se vám tohle hodit. Jelikož v hardsubu se titulků nezbavíte, budete je muset &bdquo;přelepit&ldquo; tím, že těm vašim místo pouze obrysu dáte barevné celé pozadí. Nebude to nejpěknější, ale přečtete je.
    </p>
    <p>
      Přehrávače tuto možnost někdy nabízejí, ale pokročilejší titulky (ass) si to většinou nedají líbit. Pro zaručeně úspěšné lepení doporučujeme použít editor titulků, jako náš oblíbený a odzkoušený Aegisub.<a href="http://www.aegisub.org" class="ref">D</a> Titulky v ssa nebo ass formátu obsahují styly, které udávají, jak vypadá celá skupina řádků. V Aegisubu můžete upravit styl a povolit u něj pozadí. Titulky pak uložíte a otevřete spolu s hardsubovaným videem jako obvykle.
    </p>

    <h3 class="block-title">Reference</h3>
    <div class="highlight-block">
      <ul class="references hlist">
        <li>Realita - Co všechno se bude mazat. Fórum Akihabara</li>
        <li>Budoucí vývoj Akihabary? Fórum Akihabara</li>
        <li>VLC media player</li>
        <li>Aegisub, pokročilý editor titulků</li>
      </ul>
    </div>
  </section>
</template>

<script>
import nano from '@/scripts/nano-scroll'
export default {
  methods: {
    scrollTo (ref) {
      if (!this.$refs[ref]) return
      nano(this.$refs[ref].offsetTop - 20)
      history.replaceState(null, null, `#${ref}`)
    }
  },
  mounted () {
    const h = window.location.hash
    if (h) {
      this.scrollTo(h.replace('#', ''))
    }
  }
}
</script>

<style scoped lang="stylus">
section
  counter-reset chap
h2
  counter-reset sub
  
h2.chap::before
  counter-increment chap
  content counter(chap)' '
h3.sub::before
  counter-increment sub
  content counter(chap)'.'counter(sub)' '
h2.chap::before, h3.sub::before
  color hsl(150,80%,70%)

.highlight-block
  border-left 2px solid hsl(150,80%,50%)
  padding .5em 1em
  
.block-title
  color hsl(150,80%,70%)
  
.ref
  font-size .8em
  vertical-align top
  text-decoration none
  &::before
    content '['
  &::after
    content ']'
  
.references
  list-style upper-alpha
  margin 0
  
.hlist
  padding-left 1em
  
.deco
  float right
  width 220px
  shape-outside polygon(32% 0%, 29% 11%, 12% 20%, 5% 41%, 11% 63%, 22% 73%, 28% 98%, 47% 100%, 100% 100%, 100% 0%)
  padding-left 20px
</style>
