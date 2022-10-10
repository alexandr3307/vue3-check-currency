<template>
  <div class="select-dropdown" :data-open="state">
    <label v-if="label">{{ label }}</label>
    <div ref="toggle" class="toggle" @click="toggleMenu">
      <input
        :value="searchString"
        class="search-dropdown"
        type="text"
        :placeholder="placeholder"
        @focus="focusSearch = true"
        @blur="focusSearch = false"
        @input="onSearch"
      />
    </div>
    <div class="select-dropdown-list custom-scrollbar">
      <template v-if="list.length">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="select-dropdown-list-item"
          @click="selectItem(item)"
        >
          {{ item[titleKey] }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "MySelectDropdown",
  props: {
    items: {
      type: Array,
      required: true,
    },
    titleKey: {
      type: String,
      default: "title",
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    value: {
      type: [Object, String],
      required: true,
    },
  },
  data() {
    return {
      state: false,
      list: [],
      selectedItem: null,
      deBounceTimeout: null,
      searchString: "",
      focusSearch: false,
    };
  },
  computed: {
    selected: {
      get() {
        if (this.value) {
          this.setSearchString(this.value[this.titleKey]);
        }
        return this.value;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  watch: {
    focusSearch() {
      if (!this.focusSearch) {
        setTimeout(() => {
          if (this.selectedItem) {
            this.selected = this.selectedItem;
            this.searchString = this.selectedItem[this.titleKey];
          }

          this.closeMenu();
        }, 300);
      }
    },
    selected(value) {
      if (!value) {
        this.searchString = "";
      }
    },
    items(value) {
      this.list = value;
    },
  },
  mounted() {
    this.list = this.items;
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item;
    },
    setSearchString(value) {
      this.searchString = value;
    },
    onSearch(e) {
      this.state = true;
      this.searchString = e === undefined ? "" : e.target.value;

      clearTimeout(this.deBounceTimeout);
    },
    closeMenu() {
      this.state = false;
    },
    toggleMenu() {
      this.state = !this.state;
    },
  },
};
</script>

<style lang="scss" scoped>
.select-dropdown {
  position: relative;
  display: flex;
  flex-direction: column;
  font-family: Muller, sans-serif;
  max-width: 300px;
  padding: 5px 10px;
  border: 1px solid teal;

  input {
    outline: none;
  }

  .search-dropdown {
    height: 100%;
  }

  label {
    color: #5d6166;
    font-size: 14px;
    transition: all ease-in-out 0.2s;
    margin-bottom: 8px;
  }
  .toggle {
    position: relative;
    background: #ffffff;
    height: 26px;
    text-align: left;
    font-family: inherit;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 14px;
    color: #505050;
    cursor: pointer;

    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      border: none;
      cursor: pointer;
      &:focus {
        border: none;
      }
    }

    &:focus {
      outline: none;
    }

    .placeholder {
      color: #a8a8a8;
      font-weight: 400;
    }
  }
  .select-dropdown-list {
    z-index: 2;
    display: none;
    position: absolute;
    height: 300px;
    width: 100%;
    overflow: auto;
    flex-direction: column;
    top: calc(4px + 100%);
    background: #fff;
    border: 1px solid teal;

    &-item {
      height: 50px;
      min-height: 50px;
      line-height: 50px;
      padding: 0 10px;
      color: #5d6166;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-transform: capitalize;

      &:not(:first-child) {
        border-top: 1px solid #e5e5e5;
      }
    }

    p {
      padding: 20px;
      text-align: center;
      color: #888888;
    }
  }

  &[data-open="true"] {
    .toggle {
      font-weight: 500;
      border-bottom: none;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    .select-dropdown-list {
      display: flex;
    }
  }
}
</style>
