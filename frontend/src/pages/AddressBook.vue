<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <card>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Search a contact..."
              v-model="searchFilter"
            />
            <button
              type="button"
              class="btn btn-primary ml-2"
              style="background: #666666"
              @click="createContact"
            >
              <i class="fa fa-plus"></i>
            </button>
          </div>
        </card>
      </div>
    </div>
    <div class="row" v-if="this.$store.state.addressBook.addressBook.length">
      <div
        class="col-md-4 mb-4"
        v-for="contact in filteredAddressBook"
        :key="contact.id"
      >
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title mb-2">
              {{ contact.name }}
              <span class="badge badge-success float-right">{{
                contact.tag
              }}</span>
            </h5>
            <p class="card-text">{{ contact.description }}</p>
          </div>
          <div class="card-footer">
            <small class="text-muted">{{ contact.address }}</small>
          </div>
          <a
            href="javascript:void(0)"
            @click="showContact(contact)"
            class="stretched-link"
          ></a>
        </div>
      </div>
    </div>
    <div v-else>
      <card class="text-center" style="height: 10rem;">
        <p class="card-text text-muted font-weight-bold mt-4">
          EMPTY ADDRESS BOOK
        </p>
        <p class="card-text text-muted font-italic">
          You can start adding your contacts by clicking the '+' button at the
          top right of the page
        </p>
      </card>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    searchFilter: "",
  }),
  created: function() {
    window.backend.WalletApplication.GetAddressBook().then((ab) => {
      let addressBook;
      try {
        addressBook = JSON.parse(ab);
      } catch (e) {
        addressBook = [];
      }
      this.$store.commit({ type: "addressBook/setAddressBook", addressBook });
    });
  },
  computed: {
    filteredAddressBook: function() {
      if (this.searchFilter == "") {
        return this.$store.state.addressBook.addressBook;
      } else {
        return this.$store.getters["addressBook/search"](this.searchFilter);
      }
    },
  },
  methods: {
    createContact: function() {
      this.$router.push({
        name: "new-edit contact",
        params: { id: "" },
      });
    },
    showContact: function(contact) {
      if (contact.id != this.$route.params.id) {
        this.$router.push({
          name: "contact details",
          params: { id: contact.id },
        });
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
