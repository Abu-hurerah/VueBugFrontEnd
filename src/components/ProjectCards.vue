<template>
  <div class="ag-format-container">
    <div class="ag-courses_box">
      <router-link
      v-for="(project, index) in projects"
      :key="project.id"
      :to="{ name: 'Task', params: { projectId: project.id } }"
      class="ag-courses-item_link"
    >
        <div class="static-logo">
          <img
            :src="logos[index % logos.length]"
            alt="Static Logo"
            class="logo-img"
          />
        </div>
        <h3 class="ag-courses-item_title">{{ project.title }}</h3>
        <p class="ag-courses-item_date">{{ project.description }}</p>
        <div class="ag-courses-item_date-box">
          <span class="ag-courses-item_date">
            <strong>Task Done:</strong> {{ project.completedTasks }}/{{ project.totalTasks }}
          </span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    projects: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      logos: [
        require('@/assets/Images/staticlogo.png'),
        require('@/assets/Images/Staticlogo2.png'),
        require('@/assets/Images/Staticlogo3.png'),
        require('@/assets/Images/Staticlogo4.png'),
        require('@/assets/Images/Staticlogo5.png'),
        require('@/assets/Images/Staticlogo6.png'),
      ],
    };
  },
};
</script>

<style scoped>
.ag-format-container {
  width: 1142px;
  margin: 0 auto;
  padding-top: 50px;
}

.ag-courses_box {
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 30px; 
  background-color: white;
  padding: 5px;
}

.ag-courses-item_link {
  display: block;
  padding: 30px 20px;
  background-color: #fff;
  position: relative;
  color: #000;
  text-decoration: none;
  border-radius: 0;
  height: 100%; /* Ensure link takes the full height of the card */
  box-sizing: border-box;
}

.ag-courses-item_link:hover,
.ag-courses-item_link:hover .ag-courses-item_date {
  text-decoration: none;
  color: #000;
}

.ag-courses-item_title {
  min-height: 87px;
  margin: 0 0 25px;
  font-weight: bold;
  font-size: 24px;
  color: #000;
}

.ag-courses-item_date-box {
  font-size: 18px;
  color: #000;
}

.ag-courses-item_date {
  font-weight: bold;
  color: #070707;
  transition: color 0.5s ease;
}

.static-logo {
  top: 10px;
  left: 10px;
}

.logo-img {
  width: 50px;
  height: auto;
}

.ag-courses-item_link {
  border: 1px solid #ad9a9a; /* Adding border */
}

@media only screen and (max-width: 979px) {
  .ag-courses-item_link {
    flex-basis: calc(50% - 30px);
  }
  .ag-courses-item_title {
    font-size: 24px;
  }
}

@media only screen and (max-width: 767px) {
  .ag-format-container {
    width: 96%;
  }
}

@media only screen and (max-width: 639px) {
  .ag-courses-item_link {
    flex-basis: 100%;
  }
  .ag-courses-item_title {
    min-height: 72px;
    line-height: 1;
    font-size: 24px;
  }
  .ag-courses-item_link {
    padding: 22px 40px;
  }
  .ag-courses-item_date-box {
    font-size: 16px;
  }
}
</style>
