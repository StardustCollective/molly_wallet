<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <form ref="textareaform" @submit.prevent="form" class="container">
          <div class="row">
            <div class="col mx-auto login-box">
              <div>
                <label class="control-label">Select your Private Key (P12 or JSON file)</label>
                <file-selector
                  v-model="keystorePath"
                  :placeholder="keystorePath"
                  action="SelectFile"
                />
              </div>

              <div class="input-box">
                <div>
                  <password-input
                    v-model="keystorePassword"
                    label="Password"
                    :validate="false"
                  />
                </div>
              </div>
              <div class="button-box">
                <div class="container">
                  <div class="row">
                    <div class="col">
                      <p-button
                        type="primary"
                        block
                        @click.native="loadKeyStoreFile(keystorePath, keystorePassword)"
                      >
                        <span style="display: block"> IMPORT</span>
                      </p-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <page-overlay text="Loading..." :isActive="overlay" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { keyStoreFile } from "@stardust-collective/dag-keystore";
import {dagWalletAccount} from '@stardust-collective/dag-wallet-sdk';
import Swal from "sweetalert2/dist/sweetalert2";

export default {
  name: "import-keystore",
  data: () => ({
    keystorePassword: "",
    KeyPassword: "",
    overlay: false,
  }),
  computed: {
    ...mapState("app", ["network"]),
    keystorePath: {
      get() {
        return this.$store.state.wallet.keystorePath;
      },
      set(value) {
        this.$store.commit("wallet/setKeystorePath", value);
      },
    },
    alias: {
      get() {
        return this.$store.state.wallet.alias;
      },
      set(value) {
        this.$store.commit("wallet/setAlias", value);
      },
    },
  },
  methods: {
    loadKeyStoreFile: function (filePath, password) {

      if (!filePath ||  !password) {
        //TODO - this shouldn't happen when we have form validation. For now it means skip and continue flow
        this.createWalletPassword()
        return
      }

      let reader = new FileReader();

      reader.readAsBinaryString(filePath);

      reader.onload = () => {

        let keyPair;

        try {
          keyPair = keyStoreFile.readP12(reader.result, password);
        }
        catch (e) {
          //TODO - ERROR (Vito)
          //this.errorMessage = e.message;
        }

        if (keyPair) {
          // TODO - save seed and privKey to KeyChain (Alex)
          dagWalletAccount.loginPrivateKey(keyPair.privateKey);

          this.createWalletPassword()
        }
      };

      reader.onerror = () => {
        //TODO - ERROR (Vito)
        //this.errorMessage = 'Unable to read file';
      };
    },
    createWalletPassword: function () {

      Swal.close();
      this.$store.dispatch("wallet/reset").then(() => {
        this.$router.push({
          name: "create wallet password",
          params: {
            message: "Please enter your new Molly Wallet passwords below:",
            title: "Create wallet password",
            darkMode: this.$route.params.darkMode,
          },
        });
      });
    },
  },
};

</script>

<style scoped lang="scss">
.login-box {
  max-width: 29rem;
  min-width: 29rem;
  padding-bottom: 2rem;
  margin-top: 5.25em;
}

.link-text {
  color: #34b4e7;
}

.link-text:hover {
  color: #ce9483;
  cursor: pointer;
}

.input-box > div {
  margin-bottom: 1.875em;
}

.button-box .container {
  margin-left: 0em;
  margin-right: 0em;
  padding-left: 0em;
  padding-right: 0em;
}

.button-box .container .row {
  margin-left: 0em;
  margin-right: 0em;
  padding-left: 0em;
  padding-right: 0em;
  margin-top: 1.25em;
}

.button-box .container .row [class^="col"] {
  margin-left: 0em;
  margin-right: 0em;
  padding-left: 0em;
  padding-right: 0em;
}
</style>
