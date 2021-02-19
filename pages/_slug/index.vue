<template>
  <div>
    <div class="bg-red-500 py-24">
      XXX
      <b-breadcrumb :items="items" />

      <b-avatar variant="primary" text="BV" />
      <b-img src="https://picsum.photos/300/150/?image=41" fluid alt="Fluid image" />
    </div>
    <Bloks :class="componentClass" :bloks="story.content.bloks" />
  </div>
</template>
<script>
export default {
  components: {},
  async asyncData ({ $storyblok, error }) {
    try {
      const { story } = await $storyblok.getCurrentStory({
        resolve_links: 'url',
        // resolve grid relations
        resolve_relations: 'blok_grid.source'
      })

      return {
        story
      }
    } catch (e) {
      console.error('Exception', e)
      error({
        statusCode: 404,
        message: e.message
      })
    }
  },
  data () {
    return {
      items: [
        {
          text: 'Admin',
          href: '#'
        },
        {
          text: 'Manage',
          href: '#'
        },
        {
          text: 'Library',
          active: true
        }
      ]
    }
  },
  computed: {
    componentClass () {
      switch (this.story.content.component) {
        case 'content-page':
          return ['my-12']
        case 'landing-page':
          return false
        default:
          return false
      }
    }
  }
}
</script>
