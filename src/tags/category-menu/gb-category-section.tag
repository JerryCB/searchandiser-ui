<gb-category-section>
  <div class="gb-category-section { parentOpts.style() }">
    <a if={ opts.named } class="gb-category-section__header" onmouseover={ updateSectionImages } data-try={ name }>{ name }</a>
    <a each={ item in items } class="gb-category-section__link" onmouseover={ updateCategoryImages }>{ item }</a>
  </div>

  <script>
    this.parentOpts = this.parent.parent.opts;
    this.updateSectionImages = this.parent.parent.updateSectionImages;
    this.updateCategoryImages = this.parent.parent.updateCategoryImages;
  </script>

  <style scoped>
    .gb-stylish.gb-category-section {
      min-width: 120px;
      flex-wrap: wrap;
      padding: 6px 8px;
    }

    .gb-stylish .gb-category-section__header {
      padding: 6px 4px;
      margin: 0;
      font-size: 1.1em;
      font-weight: bold;
    }

    .gb-stylish a {
      padding: 3px 4px;
      text-decoration: none;
      display: block;
    }

    .gb-stylish a:hover {
      background-color: #f1f1f1;
    }
  </style>
</gb-category-section>
