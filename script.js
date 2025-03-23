function toggleMenu() {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');

  if (!menu || !icon) {
    // console.error("Menu or Icon not found!");
    return;
  }

  menu.classList.toggle('open');
  icon.classList.toggle('open');

  // Debugging: Check menu state
  // console.log("Menu toggled:", menu.classList.contains("open"));
}

// Animation class---------------------------------------------------------------------------

// Initialize animation classes
function initializeAnimations() {
  // Add animation classes to sections
  document.querySelectorAll('section').forEach((section) => {
    section.classList.add('animate-on-scroll');
  });

  // Add specific animations to elements
  // Profile section
  const profilePic = document.querySelector('#profile .section__pic-container');
  const profileText = document.querySelector('#profile .section__text');
  profilePic?.classList.add('slide-in-left');
  profileText?.classList.add('slide-in-right');

  // About section
  const aboutPic = document.querySelector('#about .section__pic-container');
  const aboutDetails = document.querySelector('.about-details-container');
  aboutPic?.classList.add('slide-in-left');
  aboutDetails?.classList.add('slide-in-right');

  // Add stagger effect to about containers
  const aboutContainers = document.querySelector('.about-containers');
  aboutContainers?.classList.add('stagger-children');
  aboutContainers
    ?.querySelectorAll('.details-container')
    .forEach((container) => {
      container.classList.add('fade-in');
    });
}

// Function to check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0;
}

// Function to handle scroll animations
function handleScrollAnimations() {
  // Get all elements with animation classes
  const animatedElements = document.querySelectorAll(
    '.animate-on-scroll, .slide-in-left, .slide-in-right, .fade-in'
  );

  animatedElements.forEach((element) => {
    if (isInViewport(element)) {
      element.classList.add('active');
    } else {
      // Remove active class when element is out of viewport
      element.classList.remove('active');
    }
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeAnimations();
  handleScrollAnimations(); // Initial check for visible elements
});

// Add scroll event listener with throttling for performance
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout);
  }
  scrollTimeout = window.requestAnimationFrame(() => {
    handleScrollAnimations();
  });
});

// Handle animations on resize
window.addEventListener('resize', handleScrollAnimations);

function createTrainingBar() {
  const trainingBar = document.getElementById('trainingBar');
  const viewportHeight = window.innerHeight; // Height of the viewport
  const charCount = Math.floor(viewportHeight / 6); // Adjust characters based on viewport

  trainingBar.innerHTML = '';
  for (let i = 0; i < charCount; i++) {
    const char = document.createElement('div');
    char.className = 'char incomplete';
    char.textContent = '.';
    trainingBar.appendChild(char);
  }
}

function updateProgress() {
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight; // Total scrollable height
  const scrolled = window.scrollY;
  const progress = scrolled / scrollHeight; // Percentage of scroll completed

  const trainingBar = document.getElementById('trainingBar');
  const chars = trainingBar.getElementsByClassName('char');
  const completedCount = Math.floor(chars.length * progress);

  for (let i = 0; i < chars.length; i++) {
    if (i < completedCount) {
      chars[i].textContent = '=';
      chars[i].className = 'char complete';
    } else if (i === completedCount) {
      chars[i].textContent = '>';
      chars[i].className = 'char current';
    } else {
      chars[i].textContent = '.';
      chars[i].className = 'char incomplete';
    }
  }

  // Update metrics display
  const totalEpochs = 6877;
  const currentEpoch = Math.floor(progress * totalEpochs);
  const eta = Math.ceil(((totalEpochs - currentEpoch) * 2.146) / totalEpochs);

  document.getElementById(
    'progress-text'
  ).textContent = `${currentEpoch}/${totalEpochs} [${Array(20)
    .fill('=')
    .slice(0, Math.floor(progress * 20))
    .join('')}${Array(20)
    .fill('.')
    .slice(Math.floor(progress * 20))
    .join('')}] - ${(progress * 100).toFixed(1)}%`;
  document.getElementById('eta-text').textContent = `ETA: ${eta}s`;
}

// Initialize and update on scroll/resize
createTrainingBar();
window.addEventListener('scroll', updateProgress);
window.addEventListener('resize', () => {
  createTrainingBar();
  updateProgress();
});
updateProgress();

// function for project pop up--------------------------------------------------

function openFullscreenModal(id) {
  document.getElementById(id).style.display = 'flex';
}

// Function to close fullscreen modal
function closeFullscreenModal(id) {
  document.getElementById(id).style.display = 'none';
}

// Close modal when clicking outside the content
window.onclick = function (event) {
  const modals = document.querySelectorAll('.fullscreen-modal');
  modals.forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
};

// Open modal with achievement details
function openAchievement(id) {
  const achievement = achievements.find((item) => item.id === id);
  if (!achievement) return;

  // Populate modal content
  document.getElementById('modal-title').innerText = achievement.title;
  document.getElementById('modal-image').src = achievement.image;
  document.getElementById('modal-description').innerText =
    achievement.description;

  // Populate collaborators
  const collaboratorsList = document.getElementById('modal-collaborators');
  collaboratorsList.innerHTML = ''; // Clear existing list
  achievement.collaborators.forEach((collaborator) => {
    const li = document.createElement('li');
    li.innerText = collaborator;
    collaboratorsList.appendChild(li);
  });

  // Show the modal
  document.getElementById('achievement-modal').style.display = 'flex';
}

// Close the modal
function closeAchievement() {
  document.getElementById('achievement-modal').style.display = 'none';
}


// contact form

document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const formStatus = document.getElementById("form-status");
  formStatus.textContent = "Sending message...";
  formStatus.style.color = "blue"; // Indicate processing state

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const title = document.getElementById("title").value;
  const message = document.getElementById("message").value;

  // Initialize EmailJS
  emailjs.init("dYismGPbwaMFFeSO4");  // Replace with your EmailJS Public Key

  // Send Email using predefined recipient in EmailJS template
  emailjs.send("service_vr3vz3f", "template_70ottil", {
      to_email: "varunsimha90@gmail.com",  // Set recipient manually
      name: name,
      email: email,
      subject: title,
      message: message
  })
  .then(() => {
      formStatus.textContent = "Message sent successfully!";
      formStatus.style.color = "green";
      document.getElementById("contact-form").reset();
  })
  .catch((error) => {
      formStatus.textContent = "Failed to send message. Try again.";
      formStatus.style.color = "red";
      console.error("Error:", error);
  });
});
