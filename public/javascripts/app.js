 (function ($, TimelineMax, TweenMax, Power3, Back, SteppedEase, ScrollMagic, history) {
   $(function () { // wait for document ready
     // init
     var controller = createScrollController()
     controller.scrollTo(function (target) {
       TweenMax.to(window, 2, {
         scrollTo: {
           y: target,
           autoKill: true // Allow scroll position to change outside itself
         },
         ease: Power3.easeInOut
       })
     })
     $('.nav-link').click(function (event) {
       event.preventDefault()
       var linkTarget = $(this).attr('href')
       controller.scrollTo(linkTarget)
         // If supported by the browser we can also update the URL
       if (window.history && window.history.pushState) {
         history.pushState('', document.title, linkTarget)
       }
     })
     var sectionIdSceneFnMapping = {
       whyMorph: createWhyMorphScene,
       agingProcess: createAgingProcessScene,
       gallery: createGalleryScene,
       morphingProcess: createMorphingProcessScene
     }
     var infoBubbleHelpMapping = {
       ear: 'The ears may lengthen in some people (probably caused by cartilage growth). Men may develop hair in their ears that becomes longer, coarser, and more noticeable as they age',
       eye: 'The tissue around the eyes sag inferiorly .The eyelids, upper and lower, themselves sag inferiorly. The tissue of the forehead drifts creating wrinkles and dropping the eyebrows downward giving them a flatter appearance.',
       nose: 'The nose may elongate and move the tip inferiorly. The nose may develop a small to pronounced dorsal hump. The tip of the nose may enlarge and become bulbous.',
       skin: 'As we get older, we sweat less and our skin has less oil, causing the skin to become dry and emphasize the appearance of wrinkles over the face. Our skin gets thinner and loses fat making it less plump and smooth.',
       wrinkle: 'Fibers in the skin called collagen and elastin break down and lose strength as a person gets older. Cumulative exposure to the sun contributes to this process. Without these fibers, the skin cannot hold its shape as well. Older skin retains less fat, making it look less supple. The pull of gravity also causes the skin to sag.',
       teeth: 'Our gums might pull back (recede) from the teeth. Certain medications, such as those that treat allergies, asthma, high blood pressure and high cholesterol, can also cause dry mouth. As a result, your teeth and gums might become slightly more vulnerable to decay and infection.',
       spot: 'Dark spots on the skin, particularly the arms, hands, face and feet, stem from prolonged exposure to the sun. Most people call these marks liver spots, but they are unrelated to liver function. They actually stem from overproduction of the pigment melanin in areas of the skin that have experienced the most exposure to the sun.',
       hair: 'Graying of hair is another change you may notice in appearance. It is the result of loss of pigment cells which give hair its color. Graying is usually gradual and may begin in the 20s. More than half the population over age 50 has graying of the hair over the scalp. While hair loss is usually preceded by graying, thinning of the hair is another common change in aging men and women. In men the hair loss usually begins in the front of the scalp and gradually extends to cover the crown and top of the scalp. Men usually do not lose hair along the fringe of the scalp. In fact, this hair is usually a great source for transplanting to other areas of the scalp. Hair loss under the arms (axillary hair) also occurs normally in aging. The central hairs remain and are often grayer and thinner.'
     }
     var personData = [{
       name: 'Arnold',
       dob: 'July 30, 1947 (age 68)',
       description: 'Arnold Alois Schwarzenegger is an Austrian-American actor, filmmaker, businessman, investor, author, philanthropist, activist, former professional bodybuilder and former politician.'
     }, {
       name: 'Hellen Mirren',
       dob: 'December 18, 1963 (age 52)',
       description: 'William Bradley "Brad" Pitt (born December 18, 1963) is an American actor and producer. He has received a Golden Globe Award, a Screen Actors Guild Award, and three Academy Award nominations in acting categories, and received three further Academy Award nominations, winning one, as producer under his own company Plan B Entertainment.'
     }, {
       name: 'Micheal Douglas',
       dob: '1972',
       description: ''
     }, {
       name: 'Robin Williams',
       dob: 'January 3, 1956 (age 60)',
       description: 'Mel Colm-Cille Gerard Gibson AO is an American actor and filmmaker. Gibson was born in Peekskill, New York, and moved with his parents to Sydney, Australia, when he was 12 years old.'
     }, {
       name: 'Ben Afleck',
       dob: ' January 17, 1962 (age 54)',
       description: 'James Eugene "Jim" Carrey is a Canadian American actor, comedian, impressionist, screenwriter, and producer. He is known for his highly energetic slapstick performances.'
     }, {
       name: 'Angelina Jolie',
       dob: ' June 4, 1975 (age 40)',
       description: 'Angelina Jolie Pitt is an American actress, filmmaker, and humanitarian. She has received an Academy Award, two Screen Actors Guild Awards, and three Golden Globe Awards, and has been cited as Hollywood\'s highest-paid actress.'
     }, {
       name: 'Meryl Streep',
       dob: ' June 4, 1975 (age 40)',
       description: 'Angelina Jolie Pitt is an American actress, filmmaker, and humanitarian. She has received an Academy Award, two Screen Actors Guild Awards, and three Golden Globe Awards, and has been cited as Hollywood\'s highest-paid actress.'
     }, {
       name: 'Salma Hayek',
       dob: ' June 4, 1975 (age 40)',
       description: 'Angelina Jolie Pitt is an American actress, filmmaker, and humanitarian. She has received an Academy Award, two Screen Actors Guild Awards, and three Golden Globe Awards, and has been cited as Hollywood\'s highest-paid actress.'
     }, {
       name: 'Young Girl',
       dob: ' June 4, 1975 (age 40)',
       description: 'Angelina Jolie Pitt is an American actress, filmmaker, and humanitarian. She has received an Academy Award, two Screen Actors Guild Awards, and three Golden Globe Awards, and has been cited as Hollywood\'s highest-paid actress.'
     } ]
     /*****/
     createTitleScene()
     $('section.panel').each(function (index, elem) {
       var sceneMappingFn = sectionIdSceneFnMapping[$(this).attr('id')]
       if (sceneMappingFn) {
         var sceneObject = sceneMappingFn.call(this)
         if (sceneObject) {
           sceneObject.addTo(controller)
         }
       }
     })

     function createScrollController () {
       var controller = new ScrollMagic.Controller({
         globalSceneOptions: {
           triggerHook: 'onLeave'
         }
       })
       return controller
     }

     function createTitleScene () {
       var header = $('.title-header')
       var timeLine = new TimelineMax({ delay: 0.01 })
       timeLine.add('start', 2)
       timeLine.staggerFrom('.letter', 2, { scale: 0.5, rotation: 360, opacity: 0, ease: SteppedEase.config(12), force3D: true }, 0.25)
       timeLine.from('.title-border', 2, { width: 0, ease: Power0.easeNone }, 'start')
     };

     function createCarouselTween (mainElem) {
       var currentSlide = 0
       var noOfSlides = mainElem.find('.carousel-item').length
       var initialPosition = 100
       var tween = new TimelineMax({repeat: -1})
       mainElem.find('.carousel-item').each(function () {
         initialPosition = initialPosition - 100
         tween.to(mainElem, 1, { left: initialPosition + '%', ease: Back.easeOut.config(1.7) })
             .from($(this).find('.carousel-header'), 0.5, {opacity: 0, height: 0})
             .from($(this).find('.carousel-caption'), 0.5, {opacity: 0, height: 0})
             .from($(this), 3, {opacity: 1})
       })
       tween.to(mainElem, 1, {
         left: '0%',
         ease: Back.easeOut.config(1.7)
       })
       return tween
     }

     function createMorphingProcessScene () {
       var $container = $('.carousel-inner')
       var tween = createCarouselTween($container)

       var scene = new ScrollMagic.Scene({
         triggerElement: this
       }).setPin(this).setTween(tween)
       return scene
     }

     function createWhyMorphScene () {
       var header = $(this).find('.first-box')
       var tween = new TimelineMax().to(header, 0.5, {
         rotate: 360,
         scale: 2.5
       })
       var scene = new ScrollMagic.Scene({
         triggerElement: this
       }).setTween(tween)
             .setPin(this)
       scene.on('enter', function (event) {
         console.log('y Scene entered.')
       })
       scene.on('leave', function (event) {
         console.log('y Scene left.')
       })
       return scene
     }

     function createAgingProcessScene () {
       var bubble = $(this).find('.info-bubble')
       var tween = new TimelineMax().staggerFrom(bubble, 0.75, {
         top: '50%',
         left: '50%',
         opacity: 0
       }, 0.25)
       bubble.click(infoBubbleClickHandler)
       var scene = new ScrollMagic.Scene({
         triggerElement: this
       }).setTween(tween)
             .setPin(this)
       scene.on('enter', function (event) {
         console.log('Age Scene entered.')
       })
       scene.on('leave', function (event) {
         console.log('Age Scene left.')
         $('.info-bubble-container').addClass('hidden')
       })
       return scene
     }

     function createGalleryScene () {
       var header = $(this).find('.first-box')
       var tween = new TimelineMax().to(header, 0.5, {
         rotate: 360,
         scale: 2.5
       })
       var scene = new ScrollMagic.Scene({
         triggerElement: this
       }).setTween(tween)
             .setPin(this)
       initialiseLightBox.call($(this))
       return scene
     }

     function initialiseLightBox () {
       var backdropElem = $('.lightbox-backdrop')
       var lightBoxElem = $('.lightbox')
       this.find('.gallery-thumbnail-cell').click(function (event) {
         var currentElem = $(this)
         backdropElem.show()
         lightBoxElem.slideDown()
         createImageSlider.call(currentElem)
       })
       backdropElem.click(function () {
         $('.lightbox').fadeOut()
         $('.lightbox-backdrop').hide()
       })
       $('.before-after-container').beforeAfter({ imagePath: '../../images/' })
     }

     function createImageSlider () {
       var beforeUrl = this.data('beforeName')
       var afterUrl = this.data('afterName')
       var personName = this.data('personName')
       $('.lightbox-text h2').html(personName)
       var obj = findPerson(personName)
       $('.lightbox-text p').html(obj.description)
       $('.lightbox-text span').html(obj.dob)
       $('.before-container img').attr('src', beforeUrl)
       $('.after-container img').attr('src', afterUrl)
     }

     function findPerson (name) {
       var personObject
       for (var index = 0; index < personData.length; index++) {
         var currentObject = personData[index]
         if (currentObject.name === name) {
           personObject = currentObject
           break
         }
       }
       return personObject
     }

     function infoBubbleClickHandler (event) {
       var bubbleKey = $(this).data('bubbleName')
       if (!bubbleKey) {
         return false
       }
       var infoText = infoBubbleHelpMapping[bubbleKey]
       var topPosition = $(this).position().top
       var leftPosition = $(this).position().left
       $('.info-bubble-container').find('.info-bubble-text').html(infoText).end().css('top', (topPosition - 20)).css('left', (leftPosition - 20)).removeClass('hidden')
     }
   })
 })(window.jQuery, window.TimelineMax, window.TweenMax, window.Power3, window.Back, window.SteppedEase, window.ScrollMagic, history)
