<template>
  <section>
    <h2>Ahoj!</h2>
    <p>
      Máte zájem pomoci našemu skromnému týmu? Pokud ano, stačí si přečíst něco málo o rolích v týmu, které můžete zaujmout. <br>
      Pokud už máte jasno o tom, co byste spolu s námi chtěli dělat, můžete rovnou vyplnit naší <a @click.prevent="scrollToForm" href="#formular">jednoduchou přihlášku</a> dole. Opravdu, jednodušší přihlášku nikde jinde nenajdete.
    </p>

    <bubble speaker="Ovi">Jeden z mnoha benefitů: {{benefit.pitch}}</bubble>
    <bubble right speaker="Bosi">{{benefit.response}}</bubble>

    <p>Než začnete, chceme Vás varovat, že jakkoli neseriózně následující text působí, naše překlady jsou rozhodně seriózní projekty.</p>
    <p>
      Ovšem aby bylo jasno, nejde o žádné zaměstnání ani nic tomu podobného. <b>Jsme jen parta lidí, co se dobrovolně věnuje překladu.</b>
    </p>

    <h2>Informace o rolích v týmu</h2>
    <div class="switches">
      <fieldset class="radio-group">
        <input type="radio" v-model="category" value="preklad" id="category-preklad">
        <label for="category-preklad">Překládání</label>
        <input type="radio" v-model="category" value="korekce" id="category-korekce">
        <label for="category-korekce">Korekce</label>
        <input type="radio" v-model="category" value="encoding" id="category-encoding">
        <label for="category-encoding">Enkódování</label>
      </fieldset>
    </div>

    <div v-if="category === 'preklad'">
      <p>Jako překladatel budete čelit mnoha nástrahám v cizojazyčných titulcích. S podivnými výrazy, kterým neporozumíte, Vám samozřejmě pomohou ostatní členové týmu (nebo se o to pokusí), ovšem zdánlivě nekonečné množství řádků k překladu budete muset překonat sami.</p>
      <bubble speaker="Cerx">Já jsem překládal tak pomalu, až se mi rozbil pevný disk!</bubble>
      <bubble right speaker="Bosi">Proto nebuďte líní jako Cerx.</bubble>
      <h4>Seznam cílů ve zkratce:</h4>
      <ul>
        <li>Překládat anime <router-link to="/navrhy">navržené komunitou</router-link> nebo podle vlastního výběru</li>
        <li>Překládat ve vhodném jazykovém stylu, podle projektu</li>
        <li>Snažit se nedělat zbytečné chyby v zájmu zdraví korektorů</li>
        <li>Dostatečně umět jazyk, ze kterého chci překládat</li>
        <li>Nebýt línější, než Cerx</li>
      </ul>
    </div>

    <div v-if="category === 'korekce'">
      <p>Jako korektor budete opravovat chyby po překladatelích. Odhalíte sebemenší pravopisnou či stylistickou chybu a případně zařídíte, aby se už neopakovala (pokud možno nenásilnou metodou). Oproti překladu jde o poměrně rychlý proces, ale budete poslední, kdo kontroluje správnost textu, tak si dejte záležet.</p>
      <bubble speaker="Artass">Nebo můžete být pár týdnů bez práce...</bubble>
      <bubble right speaker="Machy">Za to ale mohou překladatelé... Jo ták.</bubble>
      <h4>Seznam cílů ve zkratce:</h4>
      <ul>
        <li>Opravovat chyby po překladatelích</li>
        <li>Zpochybňovat výrazy, u kterých si nebudete jisti a vydolovat z překladatele, o co jde</li>
        <li>Dávat pozor na chyby stylů nebo písem v titulcích</li>
      </ul>
    </div>

    <div v-if="category === 'encoding'">
        <p>Jako enkodér budete bit po bitu ze zdrojového videa tvořit video pro vydání a video pro online stream. Ne, to je lež, udělá to za Vás počítač. Jde jen o to mu to přikázat. Pokud jste to nikdy nedělali, ale myslíte, že na to máte hardware, nelekněte se těch technoblábolů dole, všechno Vás naučíme.</p>
        <bubble speaker="Cerx">Jak vypaluješ assy?</bubble>
        <bubble right speaker="Ovi">
          <span style="font-size:1.3em;font-family:serif">( ͡° ͜ʖ ͡°)</span> <br>
          <code>...ffmpeg -i "$f" -vf "ass=${f%.*}.ass, scale=1280:720" ${f%.*}-converted.mp4</code>
        </bubble>
        <h4>Seznam cílů ve zkratce:</h4>
        <ul>
            <li>Stahovat příslušná videa nebo slušně poprosit překladatele, ať je kouká navalit</li>
            <li>Vytvořit mkv ke stažení s vloženými titulky (softsub)</li>
            <li>Vytvořit mp4 pro stream (h.264) s vypálenými titulky (vyžaduje buď silnější grafickou jednotku nebo silnější vůli to přečkat)</li>
        </ul>
    </div>
    <p>Možná jste si na stránce týmu všimli i jiných rolí, než jsou tyto tři. Samozřejmě můžete být kýmkoliv (kromě Batmana), ale na tom se domluvíme až pak. Stejně jako na všem ostatním. Hle, nejjednodušší přihláška široko daleko:</p>

    <div ref="formular" id="formular">

        <h2>Přihláška</h2>

        <form @submit.prevent="handleApplication">
            <label for="name"><span class="num">1</span> Jak Vám máme říkat?</label>
            <input required type="text" class="textInput" name="name" id="name" ref="name" placeholder="Jméno nebo přezdívka...">
            <bubble speaker="Ovi">Nejste si jisti? Zkuste {{nameSuggestion}}.</bubble>
            <br>
            <p><span class="num">2</span> Teď zašktrněte role, o které máte zájem. Klidně i víc.</p>
            <div class="checkboxContainer">
                <input type="checkbox" name="role:preklad" id="role:preklad" class="checkbox-hidden"/>
                <label for="role:preklad" class="checkbox">
                    <div class="checkboxIcons"><i class="mdi mdi-close"></i><i class="mdi mdi-check"></i></div>
                </label>
                <label for="role:preklad" class="checkboxLabel"><i class="mdi mdi-translate"></i> Překlad</label>
            </div>
            <div class="checkboxContainer">
                <input type="checkbox" name="role:korekce" id="role:korekce" class="checkbox-hidden"/>
                <label for="role:korekce" class="checkbox">
                    <div class="checkboxIcons"><i class="mdi mdi-close"></i><i class="mdi mdi-check"></i></div>
                </label>
                <label for="role:korekce" class="checkboxLabel"><i class="mdi mdi-auto-fix"></i> Korekce</label>
            </div>
            <div class="checkboxContainer">
                <input type="checkbox" name="role:encoding" id="role:encoding" class="checkbox-hidden"/>
                <label for="role:encoding" class="checkbox">
                    <div class="checkboxIcons"><i class="mdi mdi-close"></i><i class="mdi mdi-check"></i></div>
                </label>
                <label for="role:encoding" class="checkboxLabel"><i class="mdi mdi-cube"></i> Encoding</label>
            </div>
            <br>
            <label for="contact"><span class="num">3</span> Kontakt na Vás</label>
            <input required type="text" class="textInput" name="contact" id="contact" placeholder="Skype nebo e-mail">
            <bubble speaker="Ovi">
              Ozvu se Vám nejspíš já. Pokusím se Vás v zájmu ostatních přesvědčit, abyste se přidali k nám do skupinky na Skype, i když zadáte e-mail.
            </bubble>
            <br>
            <label for="submitBtn"><span class="num">4</span> A je to!</label>
            <input type="submit" id="submitBtn" value="Poslat">
        </form>
        <show-offline>
          <p>
            <icon symbol="wifi-off"></icon>
            Zdáte se být offline. Nebojte, i tak můžete napsat přihlášku, pošleme jí, až se připojíte.
          </p>
        </show-offline>
        <bubble speaker="Bio-senpai" v-if="sugoi">Díky, jste skvělí! Ozveme se do jednoho dne. Pokud ne, tak se asi Tegami urazil. V tom případě, prosíme, napiště do zpráv.</bubble>
        <div v-if="pending.length > 0" class="pending-applications">
          <p class="center-text">
            <icon symbol="alert"></icon>
            Tyto přihlášky se zatím nepodařilo poslat
          </p>
          <div v-for="appl in pending" class="pending-application">
            <div><icon symbol="account"></icon> {{appl.data.name}}</div>
            <div><icon symbol="chart-bubble"></icon> {{appl.data.role}}</div>
            <div><icon symbol="email"></icon> {{appl.data.contact}}</div>
          </div>
          <p>
            <btn variant="red" icon="autorenew" @click="retryPendingApplications">Zkusit znovu odeslat</btn>
          </p>
        </div>

    </div>

  </section>
</template>

<script>
let benefits = [
  {pitch: 'Pět týdnů volna!', response: 'Taxi kok?'},
  {pitch: 'Neplacená nedovolená!', response: 'Taxi kok?'},
  {pitch: 'Motivace zdarma!', response: 'Tak, tak.'},
  {pitch: 'Seznam benefitů!', response: 'To je ale blbost, co?'},
  {pitch: 'Značka pro lenochy!', response: 'No výborně!'}
]

let suggestions = [
  'občanku',
  'rodný list',
  'se zeptat příbuzných'
]

import API from 'api'
import nano from '@/scripts/nano-scroll'
import showOffline from '@/components/show-offline'
export default {
  submenu: ['Tým', 'Přidat se'],
  data () {
    return {
      category: 'preklad',
      sugoi: false,
      pending: []
    }
  },
  computed: {
    benefit () {
      return benefits[Math.floor(Math.random() * benefits.length)]
    },
    nameSuggestion () {
      return suggestions[Math.floor(Math.random() * suggestions.length)]
    }
  },
  methods: {
    scrollToForm () {
      nano(this.$refs.formular.offsetTop - 80)
      this.$refs.name.focus()
    },
    handleApplication (e) {
      let form = new FormData(e.target)
      let data = {
        name: 'Neuvedeno',
        role: 'Neuvedeno',
        contact: 'Neuvedeno'
      }
      let roles = []
      for (let [key, value] of form.entries()) {
        if (key.substr(0, 4) === 'role') {
          roles.push(key.split(':')[1])
        } else {
          data[key] = value
        }
      }
      data.role = roles.join(', ')
      new API('applicants')
        .body(data)
        .call('post')
        .then(res => {
          this.sugoi = true
          this.$emit('ticker', 'Přihláška dorazila na centrálu!', 'emoticon')
        })
        .catch(err => {
          console.error(err)
          API.addPending('applicants', data)
            .then(res => {
              this.$emit('ticker', 'Přihláška nešla odeslat, tak jsme ji uložili. Až to půjde, odešleme ji.', 'archive')
              this.updatePending()
            })
            .catch(err => {
              console.error(err)
              this.$emit('error', 'Přihlášku se nepodařilo odeslat, zkuste to znovu.')
            })
        })
    },
    updatePending () {
      API.getPending('applicants').then(pending => {
        this.pending = pending
      })
    },
    retryPendingApplications () {
      API.retryPending('applicants')
        .then(res => {
          this.updatePending()
        })
        .catch(err => {
          console.error(err)
          this.$emit('error', 'Odesílání čekajících přihlášek selhalo.')
        })
    }
  },
  components: {
    showOffline
  }
}
</script>

<style lang="stylus">
.pending-application
  border 2px solid lighten(#1e2430, 20%)
  border-radius 15px
  padding 1em
  margin-bottom 1em

.num
    display inline-block
    background #eee
    color #111
    width 1.2em
    height 1.2em
    border-radius .6em
    text-align center
    line-height 1.2em
    margin-right .3em

input:not(:valid)
    border-color hsl(350, 80%, 50%)

#formular
    height calc(100vh - 90px)
@media (orientation: portrait)
    #formular, form
        margin-bottom 100px
</style>
