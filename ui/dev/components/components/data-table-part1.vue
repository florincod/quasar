<template>
  <div>
    <div class="q-layout-padding" style="max-width: 1400px;">
      <h4>QMarkupTable</h4>
      <q-markup-table :separator="separator" wrap-cells>
        <thead>
          <tr>
            <th class="text-left">
              Dessert (100g serving)
            </th>
            <th class="text-right">
              Calories
            </th>
            <th class="text-right">
              Fat (g)
            </th>
            <th class="text-right">
              Carbs (g)
            </th>
            <th class="text-right">
              Protein (g)
            </th>
            <th class="text-right">
              Sodium (mg)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left">
              Frozen Yogurt
            </td>
            <td class="text-right">
              159
            </td>
            <td class="text-right">
              6
            </td>
            <td class="text-right">
              24
            </td>
            <td class="text-right">
              4
            </td>
            <td class="text-right">
              87
            </td>
          </tr>
          <tr>
            <td class="text-left">
              Ice cream sandwich
            </td>
            <td class="text-right">
              237
            </td>
            <td class="text-right">
              9
            </td>
            <td class="text-right">
              37
            </td>
            <td class="text-right">
              4.3
            </td>
            <td class="text-right">
              129
            </td>
          </tr>
          <tr>
            <td class="text-left">
              Eclair
            </td>
            <td class="text-right">
              262
            </td>
            <td class="text-right">
              16
            </td>
            <td class="text-right">
              23
            </td>
            <td class="text-right">
              6
            </td>
            <td class="text-right">
              337
            </td>
          </tr>
          <tr>
            <td class="text-left">
              Cupcake
            </td>
            <td class="text-right">
              305
            </td>
            <td class="text-right">
              3.7
            </td>
            <td class="text-right">
              67
            </td>
            <td class="text-right">
              4.3
            </td>
            <td class="text-right">
              413
            </td>
          </tr>
          <tr>
            <td class="text-left">
              Gingerbread
            </td>
            <td class="text-right">
              356
            </td>
            <td class="text-right">
              16
            </td>
            <td class="text-right">
              49
            </td>
            <td class="text-right">
              3.9
            </td>
            <td class="text-right">
              327
            </td>
          </tr>
        </tbody>
      </q-markup-table>

      <h2>Popup editing</h2>
      <p class="caption">
        Click on Dessert or Calories cells.
      </p>
      <q-table
        :data="data"
        :columns="columns"
        :filter="filter"
        :title="title"
        binary-state-sort
        :rows-per-page-options="[]"
        row-key="name"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="desc" :props="props">
              {{ props.row.name }}
              <q-popup-edit
                content-class="bg-primary text-white"
                buttons
                color="white"
                v-model="props.row.name"
              >
                <q-input
                  type="textarea"
                  dark
                  color="white"
                  v-model="props.row.name"
                  autofocus
                  @keyup.enter.stop
                />
              </q-popup-edit>
            </q-td>
            <q-td key="calories" :props="props">
              {{ props.row.calories }}
              <q-popup-edit v-model="props.row.calories" title="Update calories" buttons>
                <q-input type="number" v-model="props.row.calories" dense autofocus />
              </q-popup-edit>
            </q-td>
            <q-td key="fat" :props="props">
              <div>
                {{ props.row.fat }}
              </div>
              <q-popup-edit v-model="props.row.fat">
                <q-input type="textarea" v-model="props.row.fat" dense autofocus />
              </q-popup-edit>
            </q-td>
            <q-td key="carbs" :props="props">
              {{ props.row.carbs }}
              <q-popup-edit v-model="props.row.carbs" title="Update carbs" buttons persistent>
                <q-input type="number" v-model="props.row.carbs" dense autofocus hint="Use buttons to close" />
              </q-popup-edit>
            </q-td>
            <q-td key="protein" :props="props">
              {{ props.row.protein }}
              <q-popup-edit v-model="props.row.protein">
                <q-input v-model="props.row.protein" dense autofocus counter />
              </q-popup-edit>
            </q-td>
            <q-td key="sodium" :props="props">
              {{ props.row.sodium }}
              <q-popup-edit persistent v-model="props.row.sodium" :validate="val => val > 10">
                <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                  <q-input
                    autofocus
                    dense
                    :value="value"
                    hint="Sodium level"
                    :rules="[
                      val => validate(value) || 'Please enter more than 10'
                    ]"
                    @input="emitValue"
                  >
                    <template v-slot:after>
                      <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel" />
                      <q-btn flat dense color="positive" icon="save" @click.stop="set" :disable="validate(value) === false || initialValue === value" />
                    </template>
                  </q-input>
                </template>
              </q-popup-edit>
            </q-td>
            <q-td key="calcium" :props="props">
              {{ props.row.calcium }}
            </q-td>
            <q-td key="iron" :props="props">
              {{ props.row.iron }}
            </q-td>
          </q-tr>
        </template>
      </q-table>

      <h2>Grid style</h2>
      <q-toggle v-model="gridHeader" label="Grid header" />
      <q-toggle v-model="gridLoading" label="Grid loading" />

      <q-table
        grid
        :grid-header="gridHeader"
        :loading="gridLoading"
        :data="data"
        :columns="columns"
        :filter="filter"
        :selection="selection"
        :selected.sync="selected"
        @selection="onSelection"
        :visible-columns="visibleColumns"
        row-key="name"
      >
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <q-icon slot="append" name="search" />
          </q-input>
        </template>

        <template v-slot:item="props">
          <div
            class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 generic-transition"
            :style="props.selected ? 'transform: scale(0.95);' : ''"
          >
            <q-card class="generic-transition" :class="props.selected ? 'bg-grey-2' : ''">
              <q-card-section>
                <q-checkbox v-model="props.selected" :label="props.row.name" />
              </q-card-section>
              <q-separator />
              <q-list>
                <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                  <q-item-section>
                    <q-item-label>{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption>
                      {{ col.value }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </template>
      </q-table>

      <q-input filled v-model="filter" label="Search" debounce="300">
        <q-icon slot="append" name="search" />
      </q-input>

      <div>
        <q-toggle color="primary" v-model="loading" label="Show loading" />
        <q-toggle color="primary" v-model="selectionToggle" label="Multiple selection" />
        <q-select filled multiple v-model="visibleColumns" :options="columns" option-value="name" option-disable="required" emit-value />
        <q-select class="q-mt-md" filled v-model="separator" :options="['horizontal', 'vertical', 'cell', 'none']" />
      </div>

      <h2>Emulate server-side</h2>
      <q-table
        ref="server"
        :data="serverData"
        :columns="columns"
        :title="title"
        :filter="filter"
        :loading="loading"
        selection="multiple"
        :selected.sync="selected"
        :visible-columns="visibleColumns"
        row-key="name"
        :pagination.sync="serverPagination"
        :separator="separator"
        @request="request"
      >
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <q-icon slot="append" name="search" />
          </q-input>
        </template>
      </q-table>

      <h2>NO templates</h2>
      <q-table
        dark
        class="bg-black"
        color="orange"
        :separator="separator"
        :data="data"
        :columns="columns"
        :title="title"
        :filter="filter"
        :loading="loading"
        selection="multiple"
        :selected.sync="selected"
        row-key="name"
      />

      <h2>body-cell-desc template</h2>
      <q-table
        :data="data"
        :columns="columns"
        :title="title"
        :filter="filter"
        :loading="loading"
        :selection="selection"
        :selected.sync="selected"
        :visible-columns="visibleColumns"
        row-key="name"
        color="secondary"
        :separator="separator"
      >
        <template v-slot:top-selection>
          Selection
        </template>
        <template v-slot:top-left="props">
          <q-btn size="sm" round flat :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'" @click="props.toggleFullscreen()" />
          {{ visibleColumns }}
        </template>
        <template v-slot:top-right>
          <q-select
            v-model="visibleColumns"
            :options="columns"
            multiple
            option-value="name"
            option-disable="required"
            emit-value
            :display-value="$q.lang.table.columns"
            dense
            borderless
          />
        </template>

        <template v-slot:body-cell-desc="props">
          <q-td :props="props">
            <div class="q-mb-xs">
              <q-badge color="secondary">
                {{ props.value }}
              </q-badge>
            </div>
            <q-badge color="secondary">
              {{ props.value }}
            </q-badge>
          </q-td>
        </template>
      </q-table>

      <h2>no-top, no-bottom</h2>
      <q-table
        :data="data"
        :columns="columns"
        :title="title"
        :filter="filter"
        :loading="loading"
        row-key="name"
        color="primary"
        no-top
        no-bottom
      />

      <h2>top-left template</h2>
      <q-table
        :data="data"
        :columns="columns"
        :title="title"
        :filter="filter"
        :loading="loading"
        :selection="selection"
        :selected.sync="selected"
        :visible-columns="visibleColumns"
        row-key="name"
        color="amber"
      >
        <template v-slot:top-left>
          Top left template
        </template>

        <template v-slot:top-right>
          <div class="row items-center">
            <q-btn flat round size="sm" color="grey-8" icon="filter_list" class="on-right" />
            <q-btn flat round size="sm" color="grey-8" icon="more_vert" class="on-right" />
          </div>
        </template>
        <template v-slot:top-selection>
          Selection
        </template>
      </q-table>

      <h2>top template</h2>
      <q-table
        :data="data"
        :columns="columns"
        :title="title"
        :filter="filter"
        :loading="loading"
        row-key="name"
        color="primary"
      >
        <template v-slot:top>
          <div class="row items-center">
            Some awesome table
          </div>
        </template>
      </q-table>

      <h2>header-cell</h2>
      <q-table
        :data="data"
        :columns="columns"
        :title="title"
        :filter="filter"
        row-key="name"
      >
        <template v-slot:header-cell="props">
          <q-th :props="props">
            # {{ props.col.label }}
          </q-th>
        </template>
      </q-table>

      <h2>header-cell-[name]</h2>
      <q-table
        :data="data"
        :columns="columns"
        :title="title"
        :filter="filter"
        row-key="name"
      >
        <template v-slot:header-cell-calories="props">
          <q-th :props="props">
            <q-icon size="1.5em" name="thumb_up" />
            {{ props.col.label }}
          </q-th>
        </template>
      </q-table>

      <h2>header</h2>
      <q-table
        :data="data"
        :columns="columns"
        :filter="filter"
        :title="title"
        row-key="name"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
      </q-table>

      <h2>header 2</h2>
      <q-table
        :data="data"
        :columns="columns"
        :filter="filter"
        :title="title"
        row-key="name"
      >
        <template v-slot:header="props">
          <tr>
            <q-th key="desc" :props="props">
              Dessert
            </q-th>
            <q-th key="calories" :props="props">
              Calo
            </q-th>
            <q-th key="fat" :props="props">
              Fat
            </q-th>
            <q-th key="carbs" :props="props">
              Carbs
            </q-th>
            <q-th key="protein" :props="props">
              Protein
            </q-th>
            <q-th key="sodium" :props="props">
              Sodium
            </q-th>
            <q-th key="calcium" :props="props">
              Calcium
            </q-th>
            <q-th key="iron" :props="props">
              Iron
            </q-th>
          </tr>
        </template>
      </q-table>
      <h2>body template - cell button with loading</h2>
      <q-table
        :data="data"
        :columns="columns"
        :filter="filter"
        :title="title"
        row-key="name"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="desc" :props="props">
              {{ props.row.name }}
            </q-td>
            <q-td key="calories" :props="props">
              {{ props.row.calories }}
            </q-td>
            <q-td key="fat" :props="props">
              {{ props.row.fat }}
            </q-td>
            <q-td key="carbs" :props="props">
              {{ props.row.carbs }}
            </q-td>
            <q-td key="protein" :props="props">
              {{ props.row.protein }}
            </q-td>
            <q-td key="sodium" :props="props">
              {{ props.row.sodium }}
            </q-td>
            <q-td key="calcium" :props="props">
              <q-btn loading color="secondary" icon="sms_failed" @click="($event, done) => { notifyWithProps(done, props) }" :label="props.row.calcium" />
            </q-td>
            <q-td key="iron" :props="props">
              <q-badge color="amber">
                {{ props.row.iron }}
              </q-badge>
            </q-td>
          </q-tr>
        </template>
      </q-table>

      <h2>body template 2</h2>
      <q-table
        :data="data"
        :columns="columns"
        :filter="filter"
        :title="title"
        row-key="name"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
          </q-tr>
        </template>
      </q-table>

      <h2>body-cell template</h2>
      <q-table
        :data="data"
        :columns="columns"
        :filter="filter"
        :title="title"
        row-key="name"
      >
        <template v-slot:body-cell="props">
          <q-td :props="props">
            !{{ props.value }}
          </q-td>
        </template>
      </q-table>

      <h2>before/after header/footer template</h2>
      <q-table
        :data="data"
        :columns="columns"
        :filter="filter"
        :title="title"
        row-key="name"
      >
        <template v-slot:top>
          Top
        </template>
        <template v-slot:top-row>
          <q-tr>
            <q-td colspan="100%">
              Top row
            </q-td>
          </q-tr>
        </template>

        <template v-slot:bottom-row>
          <q-tr>
            <q-td colspan="100%">
              Bottom row
            </q-td>
          </q-tr>
        </template>

        <template v-slot:bottom>
          Bottom
        </template>
      </q-table>

      <h2>selection template</h2>
      <q-toggle v-model="selectionToggle" />
      <q-table
        :data="data"
        :columns="columns"
        :filter="filter"
        :color="color"
        row-key="name"
        :selection="selection"
        :selected.sync="selected"
        :loading="loading"
        :visible-columns="visibleColumns"
        :title="title"
      >
        <template v-slot:header="props">
          <q-tr>
            <q-th auto-width>
              <q-checkbox v-if="props.multipleSelect" v-model="props.selected" :indeterminate="props.partialSelected" :color="color" />
            </q-th>
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              @ {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-checkbox :color="color" v-model="props.selected" />
            </q-td>
            <q-td key="desc" :props="props">
              <q-checkbox :color="color" v-model="props.expand" checked-icon="remove" unchecked-icon="add" />
              %%% {{ props.row.name }} %%%
            </q-td>
            <q-td key="calories" :props="props">
              {{ props.row.calories }}
            </q-td>
            <q-td key="fat" :props="props">
              {{ props.row.fat }}
            </q-td>
            <q-td key="carbs" :props="props">
              {{ props.row.carbs }}
            </q-td>
            <q-td key="protein" :props="props">
              {{ props.row.protein }}
            </q-td>
            <q-td key="sodium" :props="props">
              {{ props.row.sodium }}
            </q-td>
            <q-td key="calcium" :props="props">
              {{ props.row.calcium }}
            </q-td>
            <q-td key="iron" :props="props">
              <q-badge square color="amber">
                {{ props.row.iron }}
              </q-badge>
            </q-td>
          </q-tr>
          <q-tr v-show="props.expand" :props="props">
            <q-td colspan="100%">
              <div class="text-left">
                This is expand slot for row above: {{ props.row.name }}.
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <q-table
        :data="data"
        :columns="columns"
        :filter="filter"
        :color="color"
        row-key="name"
        :selection="selection"
        :selected.sync="selected"
        :loading="loading"
        :visible-columns="visibleColumns"
        :title="title"
      >
        <template v-slot:header="props">
          <q-tr>
            <q-th auto-width>
              <q-checkbox v-if="props.multipleSelect" v-model="props.selected" :indeterminate="props.partialSelected" :color="color" />
            </q-th>
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              @ {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :key="props.key" :props="props">
            <q-td auto-width>
              <q-checkbox :color="color" v-model="props.selected" />
            </q-td>
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              ^{{ col.value }}
            </q-td>
          </q-tr>
        </template>
      </q-table>

      <q-table
        :data="data"
        :columns="columns"
        :filter="filter"
        :color="color"
        row-key="name"
        :selection="selection"
        :selected.sync="selected"
        :loading="loading"
        :visible-columns="visibleColumns"
        :title="title"
      >
        <template v-slot:header-cell="props">
          <q-th :props="props">
            # {{ props.col.label }}
          </q-th>
        </template>
        <template v-slot:body-cell="props">
          <q-td :props="props">
            !{{ props.value }}
          </q-td>
        </template>
      </q-table>

      <q-table
        :data="data"
        :columns="columns"
        :filter="filter"
        :color="color"
        row-key="name"
        :selection="selection"
        :selected.sync="selected"
        :loading="loading"
        :visible-columns="visibleColumns"
        :title="title"
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectionToggle: false,
      loading: false,
      color: 'amber',
      visibleColumns: ['desc', 'fat', 'carbs', 'protein', 'sodium', 'calcium', 'iron'],
      separator: 'horizontal',
      selected: [],
      gridHeader: false,
      gridLoading: false,

      serverPagination: {
        page: 1,
        rowsNumber: 10
      },
      serverData: [],

      title: 'QDataTable',
      filter: '',
      columns: [
        {
          name: 'desc',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: row => row.name,
          format: val => `~${val}`,
          sortable: true
        },
        { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
        { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true, classes: 'bg-grey', style: 'width: 10px' },
        { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
        { name: 'protein', label: 'Protein (g)', field: 'protein' },
        { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
        { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ],
      data: [
        {
          name: '1Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%'
        },
        {
          name: '2Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%'
        },
        {
          name: '3Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%'
        },
        {
          name: '4Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%'
        },
        {
          name: '5Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%'
        },
        {
          name: '6Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: '0%',
          iron: '0%'
        },
        {
          name: '7Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: '0%',
          iron: '2%'
        },
        {
          name: '8Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: '0%',
          iron: '45%'
        },
        {
          name: '9Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: '2%',
          iron: '22%'
        },
        {
          name: '10KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: '12%',
          iron: '6%'
        }
      ]
    }
  },
  computed: {
    selection () {
      return this.selectionToggle ? 'multiple' : 'single'
    }
  },
  methods: {
    notifyWithProps (done, props) {
      // Row cell event with access to props
      this.$q.notify({
        message: 'The dessert ' + props.row.name + ' has ' + props.row.calcium + ' Calcium!',
        icon: 'restaurant'
      })
      // Remove button spinner after 3 seconds
      setTimeout(() => { done() }, 3000)
    },
    request (props) {
      this.loading = true
      console.log('REQUEST', props)
      setTimeout(() => {
        this.serverPagination = props.pagination

        let
          table = this.$refs.server,
          rows = this.data.slice(),
          { page, rowsPerPage, sortBy, descending } = props.pagination

        if (props.filter) {
          rows = table.filterMethod(rows, props.filter)
        }

        if (sortBy) {
          rows = table.sortMethod(rows, sortBy, descending)
        }

        this.serverPagination.rowsNumber = rows.length

        if (rowsPerPage) {
          rows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage)
        }

        this.serverData = rows
        this.loading = false
      }, 2000)
    },
    onSelection (rows, added) {
      console.log(added ? 'selected' : 'un-selected', rows)
    }
  },
  mounted () {
    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    })
  }
}
</script>

<style lang="stylus">
.q-table + .q-table
  margin-top 25px
.text-pre-wrap
  white-space pre-wrap
</style>
