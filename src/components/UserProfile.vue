<script setup lang="ts">
import { Auth } from '../auth'
import { ref } from 'vue'

const auth = new Auth()
const isLoggedIn = ref(auth.isLoggedIn())
const currentUser = ref(auth.currentUser())

const signOut = function() {
  auth.signOut(() => {
    isLoggedIn.value = auth.isLoggedIn()
  })
}
</script>

<template>
  <header>
    <div class="container">

      <div class="flex">
        <div class="logo">
          <img src="../assets/imgs/chefzilla-logo-nome.png" alt="">
        </div>

        <nav>
          <ul class="flex">
            <!-- TODO adicionar links -->
            <li><a href="#">Lançamento</a></li>
            <li><a href="#">Para lojistas</a></li>
            <li><a href="#">Contato</a></li>
          </ul>
        </nav>

        <div class="buttons">
          <a href="/signup"><button class="btn-primary">Cadastre-se</button></a>
          <a href="/signin"><button class="btn-secondary">Login</button></a>
        </div>
      </div>

    </div>
  </header>

  <section class="hero">
    <div class="container">
      <div class="flex">

        <div class="null"></div>

        <div class="info">
          <h1>Quando sua fome é gigante</h1>
          <p>Peça agora, entregamos em até 15 minutos</p>
          <a href="/signin"><button class="btn-primary">Peça agora</button></a>
        </div>

      </div>
    </div>
  </section>

  <section class="benefits">
    <div class="container">

      <div class="flex">

        <div class="info flex">
          <h2>Vantagens em se tornar um parceiro</h2>

          <ul>
            <li>Maior alcance de clientes</li>
            <li>Aumento nas vendas</li>
            <li>Gestão simplificada de pedidos</li>
          </ul>

          <a href="admin"><button class="btn-secondary">Cadastre seu restaurante</button></a>

        </div>

        <div class="img-bg"></div>

      </div>
    </div>
  </section>

  <section class="banner">
    <div class="container">
      <div class="flex">

        <div class="info">
          <h2>PROMOÇÃO</h2>
          <h1>Suco de Kaiju Grátis</h1>
          <p>*Para todos os pedidos no mês de lançamento!</p>
          <a href="/signin"><button class="btn-primary">Quero meu suco já</button></a>

        </div>

        <div class="null"></div>

      </div>
    </div>
  </section>
  
  <section class="depoiments">
    <div class="container flex">
      <h2>Veja o que dizem nossos clientes</h2>

      <div class="depoiment-container">
        <div class="depoiment">
            <img src="https://picsum.photos/id/103/100/100" alt="Cliente 1">
            <p>"O melhor suco de Kaiju que já provei, achei que seria cajú, mas foi muito melhor!"</p>
            <div class="stars">
                ★★★★★
            </div>
        </div>
        <div class="depoiment">
            <img src="https://picsum.photos/id/64/100/100" alt="Cliente 2">
            <p>"9 em cada 10 dentistas recomendam ChefZilla. Entregaram no 19º andar direto pela varanda, muito tecnológico"</p>
            <div class="stars">
                ★★★★★
            </div>
        </div>
        <div class="depoiment">
            <img src="https://picsum.photos/id/91/100/100" alt="Cliente 3">
            <p>"Os entregadores são demais, chegam gritando e soltando uma luz azul esquisita, sempre muito divertido! Só deu uma febre estranha, fora isso tudo normal"</p>
            <div class="stars">
                ★★★★★
            </div>
        </div>
      </div>
    </div>
  </section>

  <footer>
    <div class="container">
        <div class="about">
            <h3>Sobre o Chefzilla</h3>
            <p>Chefzilla é o maior serviço de entrega de comida da região. Estamos comprometidos em trazer os melhores pratos diretamente para sua porta com rapidez e qualidade.</p>
        </div>
        <div class="links">
            <h3>Links Úteis</h3>
            <ul>
                <li><a href="#">Lançamento</a></li>
                <li><a href="#">Para Lojistas</a></li>
                <li><a href="#">Contato</a></li>
            </ul>
        </div>
        <div class="contact">
            <h3>Contato</h3>
            <p><i class="fas fa-phone"></i> +55 (81) 1234-5678</p>
            <p><i class="fas fa-envelope"></i> contato&#64;chefzilla.com.br</p>
            <p><i class="fas fa-map-marker-alt"></i> Av. Recife, 1234, Recife, PE</p>
        </div>
        <div class="social">
            <h3>Redes Sociais</h3>
            <div class="social-links">
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="white" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"/></svg></a>
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="white" d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07l-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/></svg></a>
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="white" d="M12.001 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6m0-2a5 5 0 1 1 0 10a5 5 0 0 1 0-10m6.5-.25a1.25 1.25 0 0 1-2.5 0a1.25 1.25 0 0 1 2.5 0M12.001 4c-2.474 0-2.878.007-4.029.058c-.784.037-1.31.142-1.798.332a2.886 2.886 0 0 0-1.08.703a2.89 2.89 0 0 0-.704 1.08c-.19.49-.295 1.015-.331 1.798C4.007 9.075 4 9.461 4 12c0 2.475.007 2.878.058 4.029c.037.783.142 1.31.331 1.797c.17.435.37.748.702 1.08c.337.336.65.537 1.08.703c.494.191 1.02.297 1.8.333C9.075 19.994 9.461 20 12 20c2.475 0 2.878-.007 4.029-.058c.782-.037 1.308-.142 1.797-.331a2.91 2.91 0 0 0 1.08-.703c.337-.336.538-.649.704-1.08c.19-.492.296-1.018.332-1.8c.052-1.103.058-1.49.058-4.028c0-2.474-.007-2.878-.058-4.029c-.037-.782-.143-1.31-.332-1.798a2.912 2.912 0 0 0-.703-1.08a2.884 2.884 0 0 0-1.08-.704c-.49-.19-1.016-.295-1.798-.331C14.926 4.006 14.54 4 12 4m0-2c2.717 0 3.056.01 4.123.06c1.064.05 1.79.217 2.427.465c.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428c.047 1.066.06 1.405.06 4.122c0 2.717-.01 3.056-.06 4.122c-.05 1.065-.218 1.79-.465 2.428a4.884 4.884 0 0 1-1.153 1.772a4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.427.465c-1.067.047-1.406.06-4.123.06c-2.717 0-3.056-.01-4.123-.06c-1.064-.05-1.789-.218-2.427-.465a4.89 4.89 0 0 1-1.772-1.153a4.905 4.905 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.012 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122c.05-1.065.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.637-.248 1.362-.415 2.427-.465C8.945 2.013 9.284 2 12.001 2"/></svg></a>
            </div>
        </div>
    </div>
    <div class="footer-bottom">
        <p>&copy; 2024 Chefzilla. Todos os direitos reservados.</p>
    </div>
  </footer>

  <!-- <main>
    <template v-if="isLoggedIn">
      <h3>Hi, {{ currentUser && currentUser.email }}</h3>
      <br />
      <nav>
        <a @click="signOut">Sign Out</a>
      </nav>
    </template>
    <template v-else>
      <h3>Please log in to have access</h3>
      <br />
      <nav>
        <RouterLink :to="{name: 'signin'}">
          Sign In
        </RouterLink>

        <RouterLink :to="{name: 'signup'}">
          Sign Up
        </RouterLink>
      </nav>
    </template>
  </main> -->
</template>

<style>
/* header */
header {
  background: var(--red);
}

header .flex {
  align-items: center;
  justify-content: space-between;
}

header .logo img {
  width: 140px;
}

header nav {
  color: white;
}

header a {
  text-decoration: none;
  color: inherit;
}

header ul {
  list-style-type: none;
  gap: 40px;
  text-transform: uppercase;
}

header li {
  transition: 200ms;
}

header li:hover {
  border-bottom: 2px solid var(--orange);
  transform: all 1s ease;
  padding-bottom: 5px;
}

@media (max-width: 900px) {
  nav {
    display: none;
  }
}

@media (max-width: 450px) {
  header .buttons {
    display: none;
  }

  header .flex {
    justify-content: center;
  }
}


/* Hero */

.hero {
  background-color: var(--orange);
}

.hero .container {
  background-image: url('../assets/imgs/banner-hero.png');
  height: 450px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.hero .null {
  width: 30%;
}

.hero .flex {
  justify-content: center;
  text-align: center;
}

.hero .info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 400px;
  color: white;
}

.hero h1 {
  text-shadow: 2px 2px black;
}

@media (max-width: 500px) {
  .hero .container {
    height: 730px;
    background-position: bottom left;
    background-size: 902px 418px;
  }  
}

/* Benefits */

.benefits .img-bg {
  background-image: url('../assets/imgs/zilla-benefits.jpg');
  height: 450px;
  width: 400px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 15px;
}

.benefits .flex {
  justify-content: space-between;
  margin: auto;
  align-items: center;
}

.benefits .info.flex {
  flex-direction: column;
  align-items: normal;
  gap: 20px;
}

.benefits li {
  padding: 15px;
  margin-left: 20px;
}

@media (max-width: 768px) {
  .benefits .container .flex {
    flex-direction: column;
  }

  .benefits button {
    margin-bottom: 40px;
  }

  .benefits .img-bg {
    width: 100%;
  }
}

/* Banner */

.banner {
  background-color: var(--azul);
}

.banner .container {
  background-image: url('../assets/imgs/banner-promo.png');
  height: 450px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.banner .null {
  width: 40%;
}

.banner .flex {
  justify-content: center;
  text-align: center;
}

.banner .info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 400px;
  color: white;
}

.banner h1 {
  text-shadow: 2px 2px black;
}

/* Depoiments */

.depoiments {
  background: white;
}

.depoiments .container h2 {
  margin: auto;
  font-size: 2.5em;
  color: #333;
  margin-bottom: 30px;
}

.depoiments .container {
  flex-direction: column;
  padding: 50px 20px;
}

.depoiment-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.depoiment {
  background-color: #f6ab321f;
  text-align: center;
  border: 1px solid #ddd;
  padding: 20px;
  width: 30%;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.depoiment img {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.depoiment p {
  font-size: 1.1em;
  color: #666;
  margin: 20px 0;
}

.stars {
  color: #ffd700;
  font-size: 1.5em;
}

@media (max-width: 768px) {
  .depoiment {
      width: 100%;
  }
}

/* Footer */

footer {
  background-color: #333;
  color: #fff;
  padding: 40px 0;
  position: relative;
  bottom: 0;
  width: 100%;
}

footer .container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

footer .container > div {
  flex: 1;
  padding: 20px;
  min-width: 200px;
}

footer h3 {
  margin-bottom: 20px;
  font-size: 1.5em;
}

footer p,
footer ul,
footer li {
  margin: 0;
  padding: 0;
  list-style: none;
  line-height: 1.8;
}

footer ul a {
  color: #fff;
  text-decoration: none;
}

footer ul a:hover {
  text-decoration: underline;
}

footer .contact p {
  margin-bottom: 10px;
}

footer .social-links a {
  margin-right: 10px;
  color: #fff;
  font-size: 1.5em;
  text-decoration: none;
}

footer .social-links a:hover {
  color: #ff4b2b;
}

footer .footer-bottom {
  text-align: center;
  padding: 20px 0;
  background-color: #222;
  border-top: 1px solid #444;
}

footer .footer-bottom p {
  margin: 0;
}

@media (max-width: 768px) {
  .footer-container {
      flex-direction: column;
      align-items: center;
  }

  footer .container > div{
      text-align: center;
  }

  .null {
    display: none;
  }
}

</style>