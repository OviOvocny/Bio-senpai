<template>
  <section>
    <cl-image v-show="entered" class="lolec" src="mascot/bot" width="100" :params="{angle: 180}"></cl-image>
    <h3>Co je Tegami?</h3>
    <p>Tegami je chat bot, tedy software, který běží na serveru a uživatelé s ním pracují zasíláním zpráv v chatu. Tegami v současné době podporuje konverzace na Skypu nebo na Facebook Messengeru.</p>
    <category-cards page="tegami" :categories="categories"></category-cards>

    <div :class="categories[0].slug" v-if="$route.params.category === categories[0].slug">
      <h1>Základy používání Tegami</h1>

      <h2>Jak se s botem spojit</h2>
      <p>
        S botem komunikujte z jedné z podporovaných chatovacích platforem.
        Přidat jej mezi kontakty můžete pomocí tlačítek <router-link to="/">na hlavní stránce</router-link> nebo tady:
      </p>
      <a href="https://join.skype.com/bot/283f634c-6815-4bcb-a3c9-4b711cb35665">
        <btn icon="skype">Přidat kontakt na Skypu</btn>
      </a>
      <a href="https://www.messenger.com/t/1642204556087603">
        <btn icon="facebook-messenger">Kontaktovat na Messengeru</btn>
      </a>

      <h2>Úvodní nastavení</h2>
      <p>Pokud tak bot neučiní sám, napište nějakou zprávu. Zahájíte tím úvodní nastavení, kde Vám položí několik otázek.</p>

      <h2>Dialogy — Jak Tegami rozpoznává váš záměr</h2>
      <p><b>Tegami není umělá inteligence.</b> Mějte toto na paměti. Tegami nedokáže reagovat na libovolnou zprávu jako chatter bot.</p>
      <p>Tegami ve Vašich zprávách hledá klíčová slova, která pak určí, který z předem definovaných dialogů začne.</p>
      <p>Dialogy představují funkce bota, které lze vyvolat zasláním zprávy. Následuje jejich seznam.</p>

      <p class="note"><icon symbol="alert"></icon> Zprávy můžete psát i bez diakritiky. Nezapomeňte ale, že pokud například odpověď na zprávu na webu zadáte bez diakritiky, odešle se bez diakritiky.</p>

      <h3>Nastavení upozorňování na zprávy</h3>
      <p>Klíčová slova: <b>upozornění</b> / <b>notifikace</b> / <b>zprávy</b></p>
      <p>Příklad: <i>Nastav zprávy</i></p>
      <p>Bot Vás provede nastavením. Určitě, zda máte zájem o upozorňování na nové zprávy na webu Bio-senpai.</p>

      <h3>Nastavení upozorňování na vydání</h3>
      <p>Klíčová slova: <b>upozornění</b> / <b>notifikace</b> / <b>vydání</b> / <b>překlady</b></p>
      <p>Příklad: <i>Nová vydání</i></p>
      <p>Bot Vás provede nastavením. Určitě, zda máte zájem o upozorňování na nově vydané epizody na webu Bio-senpai.</p>

      <h3>Zasílání odpovědí na zprávy</h3>
      <p>Klíčová slova: <b>odpověz</b> [<i>zpráva</i>] / <b>vyřiď</b> [<i>zpráva</i>]</p>
      <p>Příklad: <i>Vyřiď Co takhle překládat, lenoši?</i></p>
      <p>Pokud zprávu nezadáte rovnou, bot se Vás zeptá, co chcete poslat. Potom Vám ukáže původní zprávu a Vaší odpověď, abyste mohli odeslání potvrdit. Bot zprávu předá Bio-senpai a pak na ní upozorní, jako na každou jinou příchozí odpověď.</p>
      <p class="note"><icon symbol="alert"></icon> Odpovědi, které za Vás bot vyřídí, jsou na webu označeny jménem, kterým Vás bot oslovuje, tj. jménem, které jste zadali v úvodním nastavení.</p>

      <h3>Přejmenování uživatele</h3>
      <p>Klíčová slova: <b>přejmenuj mě</b> [na <i>jméno</i>] / <b>změň mi jméno</b> [na <i>jméno</i>] / <b>změň moje jméno</b> [na <i>jméno</i>] / <b>říkej mi</b> [<i>jméno</i>]</p>
      <p>Příklad: <i>Přejmenuj mě na Franta</i></p>
      <p>Pokud jméno nezadáte rovnou, bot se Vás zeptá, jaké chcete, aby používal. Po zadání nového jména Vás jím bude bot oslovovat a podepisovat vaše odpovědi.</p>

      <h3>Jméno uživatele</h3>
      <p>Klíčová slova: <b>moje jméno</b> / <b>kdo jsem</b> / <b>jak se jmenuji</b></p>
      <p>Příklad: <i>Jaké je moje jméno?</i></p>
      <p>Bot Vám odpoví, jaké jméno má u Vás poznamenané.</p>

      <h3>Náhodný kec</h3>
      <p>Klíčová slova: <b>random kec</b></p>
      <p>Příklad: <i>Ukaž nějaký random kec!</i></p>
      <p>Náhodný citát z naší hlavičky se objeví u Vás v chatu! Magie.</p>
    </div>
    <div :class="categories[1].slug" v-if="$route.params.category === categories[1].slug">
      <h1>Tegami a Vaše soukromí</h1>
      <p>
        Aby Tegami mohl fungovat, potřebuje o svých uživatelích vědět některé podrobnosti. Níže se dočtete, jaké informace shromažďuje a jak s nimi pracuje.
      </p>
      <h2>Jaké Tegami sbírá informace?</h2>
      <p><b>
        Tegami ukládá pouze informace, které opravdu potřebuje ke správnému fungování.
      </b></p>
      <h3>Adresy a preference</h3>
      <p>
        Tegami ukládá preference o upozorněních a adresy konverzací, kam upozornění zasílat. Tyto informace ukládá až tehdy, kdy uživatel vyjádří zájem o danou funkcionalitu.
      </p>
      <h3>Jména</h3>
      <p>
        Tegami se pro správnou funkčnost může dotázat uživatele na jméno. Také může jméno uživatele získat z platformy, kde konverzace probíhá. Po zadání jména uživatelem však tuto informaci již nepoužívá.
      </p>
      <h2>Jak tyto informace využívá?</h2>
      <h3>Adresy a preference</h3>
      <p>
        Tegami potřebuje ukládat preference uživatelů, aby měl přehled o tom, který uživatel je přihlášen k odběru kterých upozornění. Adresy konverzací jsou potřeba ukládat, aby bot mohl upozornění rozeslat cíleně.
      </p>
      <h3>Jména</h3>
      <p>
        Tegami používá jméno k oslovení uživatele a k označení zpráv odeslaných na web prostřednictvím bota jménem uživatele.
      </p>
      <h2>Mohou uživatelé přistupovat k uloženým datům?</h2>
      <p>
        Přístup k datům, která Tegami ukládá, není pro uživatele z principu možný. Uživatelská data jsou použitelná pouze v jejich vlastních dialozích. Data jako preference a adresy jsou zpracovávána pouze na úrovni serveru, kde Tegami běží. Veškerá komunikace bota, jak s webem Bio-senpai, tak s chaty, je šifrovaná.
      </p>

      <h3>Blurb požadovaný Microsoftem</h3>
      <p>Our Tegami is enabled by Microsoft Bot Framework. The Microsoft Bot Framework is a set of web-services that enable intelligent services and connections using conversation channels you authorize. As a service provider, Microsoft will transmit content you provide to our bot/service in order to enable the service. For more information about Microsoft privacy policies please see their privacy statement here: http://go.microsoft.com/fwlink/?LinkId=521839. In addition, your interactions with this bot/service are also subject to the conversational channel's applicable terms of use, privacy and data collection policies. To report abuse when using a bot that uses the Microsoft Bot Framework to Microsoft, please visit the Microsoft Bot Framework website at https://www.botframework.com and use the “Report Abuse” link in the menu to contact Microsoft.</p>
    </div>
    <div :class="categories[2].slug" v-if="$route.params.category === categories[2].slug">
      <h1>Podmínky používání Tegami</h1>
      <p>
        Bot je za pomocí podporovaných komunikačních platforem dostupný každému a to zcela bezplatně. Uživatelé souhlasí s ukládáním potřebných dat, jak je popsáno v <a href="/tegami/soukromi">zásadách ochrany soukromí</a>. Dále berou na vědomí, že tyto podmínky se mohou kdykoliv změnit bez přechozího upomenutí. Uživatelé se rovněž zavazují, že nebudou funkce bota žádným způsobem zneužívat.
      </p>
      <p>
        Tegami je (prozatím) closed source software a jeho jakékoliv šíření i úžení je striktně zakázáno.
      </p>
    </div>
  </section>
</template>

<script>
import categoryCards from '@/components/category-cards'
export default {
  data () {
    return {
      entered: false,
      categories: [
        {
          category: 'Manuál',
          slug: 'manual',
          icon: 'book'
        },
        {
          category: 'Ochrana soukromí',
          slug: 'soukromi',
          icon: 'radioactive'
        },
        {
          category: 'Podmínky používání',
          slug: 'podminky-pouzivani',
          icon: 'biohazard'
        }
      ]
    }
  },
  components: {
    categoryCards
  }
}
</script>

<style scoped lang="stylus">
h2, h3
  margin-top 1.5em
  color hsl(150,80%,50%)

.note
  border 2px solid hsl(150,80%,30%)
  padding .5em
  border-radius 10px

.lolec
  position fixed
  right 1vw
  top 25px
  animation dance 1s alternate infinite

@media (orientation: portrait)
  .lolec
    display none

@keyframes dance {
  from, 49% { transform-origin: -50% 20%; }
  50%, 75%, to { transform-origin: 150% 20%; }
  25% { transform: rotate(10deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(-10deg); }
}
</style>
