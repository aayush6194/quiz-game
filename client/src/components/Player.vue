<template>
  <div class='wrapper appear'>
    <router-link to='/'>
      <BackButton />
    </router-link>

    <h1 class="txt-center txt-primary">
      Create a player <i class="fas fa-gamepad"></i>
    </h1>
    <ul class="options">
      <li>
        <button :class='getButtonClass(0)' @click='setAvatar(0)'>
          <img alt='Male Avatar' :src='maleAvatar' class='img' />
          <div class='txt-center'>Player 1</div>
        </button>
      </li>

      <li>
        <button :class='getButtonClass(1)' @click='setAvatar(1)'>
          <img alt='Male Avatar' :src='femaleAvatar' class='img' />
          <div class='txt-center'>Player 2</div>
        </button>
      </li>
    </ul>
    <div class='grid cols'>
      <input
        class=''
        placeholder='Enter your name'
        v-model='localPlayer.name'
        v-on:keyup.enter='submit()'
      />
      <button
        placeholder='Enter your name'
        @click='submit()'
        :style='{ padding: `.5em 1em` }'
      >
        <i class='fa fa-chevron-right txt-primary' />
      </button>

      <label for='error' class='danger slide-down' v-if='error'>
        Error! Name must at least contain 2 characters and avatar must be
        selected.
      </label>
    </div>
  </div>
</template>

<script>
import maleAvatar from "../assets/user1.png";
import femaleAvatar from "../assets/user2.png";
import BackButton from "../components/BackButton";
import { mapActions, mapGetters } from "vuex";
import { sendMessage } from "../socket";

export default {
  name: 'Player',
  components: {
    BackButton
  },
  data: () => ({
    maleAvatar,
    femaleAvatar,
    error: false,
    localPlayer: {
      name: '',
      avatar: -1
    }
  }),
  computed: mapGetters(['player']),
  methods: {
    ...mapActions(['setPlayer']),
    setAvatar: function(avatar) {
      this.localPlayer = { ...this.localPlayer, avatar };
    },
    getButtonClass: function(avatar) {
      const className = "btn-option btn-rounded no-select";
      return avatar === this.localPlayer.avatar
        ? `${className} active`
        : className;
    },
    validate() {
      const { name, avatar } = this.localPlayer;
      this.error = name.length < 2 || avatar === -1 || avatar === undefined;
    },
    submit() {
      this.validate();
      if (!this.error) {
        sendMessage({
          type: "CREATE_PLAYER",
          payload: { player: this.localPlayer }
        });
        // this.setPlayer({ player: this.localPlayer });
      }
    }
  },
  created: function() {
    this.localPlayer = this.player;
  }
};
</script>

<style scoped>
.wrapper {
  padding: 1em;
  max-width: 90vw;
  animation: appear 300ms ease;
}

.btn-option {
  border: 2px solid transparent;
}

.active {
  border-color: #7fab96;
  box-shadow: 2px 2px 5px rgba(42, 109, 42, 0.15),
    1px 2px 2px rgba(15, 102, 29, 0.22);
}
.cols {
  padding: 0;
  grid-template-columns: 1fr auto;
  place-items: stretch;
}
</style>
