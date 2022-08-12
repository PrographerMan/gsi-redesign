var app = {
	init: function() {
		app.conf = {
			screenInProcess: false,
			sidebarMenu: $('.sidebar-menu__body'),
			sidebarOverlay: $('.sidebar-menu__overlay'),
			hamburgerMenu: $('.app-header__hamburger'),
			screensNavigator: $('.app-screens-list'),
			
			projects: {
				animationInProcess: false,							// статус процесса анимации
				stepDelay: 750,										// время задержки в миллисекундах
				activeProjectNumber: 0,								// номер активного проекта
				
				// список изображений
				backgroundsList: {
					handle: $('.app-screen__backgrounds-list')
				},
				
				// навигация по домам
				projectsNav: {
					handle: $('.app-screen__projects-nav')
				},
				
				// информация о домах
				projectsInfo: {
					handle: $('.app-screen__projects-panel-section_info-list')
				},
				
				// ссылки на разделы подробнее
				links: {
					handle: $('.app-screen__projects-panel-detailed-info-list')
				},
				
				// установить номер проекта
				setActiveItem: function(number) {
					if (number > app.conf.projects.backgroundsList.handle.find('.app-screen__backgrounds-list-item').length - 1 || number < 0) {
						return;
					}
					
					if (app.conf.projects.animationInProcess == true) return;
					
					app.conf.projects.animationInProcess = true;
					
					// информация об объекте
					app.conf.projects.projectsInfo.handle.find('.app-screen__project-info').removeClass('app-screen__project-info_js-active');
					app.conf.projects.projectsInfo.handle.find('.app-screen__project-info').eq(number).addClass('app-screen__project-info_js-active');
					
					// изображение
					app.conf.projects.backgroundsList.handle.find('.app-screen__backgrounds-list-item').removeClass('app-screen__backgrounds-list-item_js-active');
					app.conf.projects.backgroundsList.handle.find('.app-screen__backgrounds-list-item').eq(number).addClass('app-screen__backgrounds-list-item_js-active');
					
					// навигация
					app.conf.projects.projectsNav.handle.find('.app-screen__projects-nav-item').removeClass('app-screen__projects-nav-item_js-active');
					app.conf.projects.projectsNav.handle.find('.app-screen__projects-nav-item').eq(number).addClass('app-screen__projects-nav-item_js-active');
					
					// ссылки
					app.conf.projects.links.handle.find('.app-screen__projects-panel-detailed-info-text').removeClass('app-screen__projects-panel-detailed-info-text_js-active');
					app.conf.projects.links.handle.find('.app-screen__projects-panel-detailed-info-text').eq(number).addClass('app-screen__projects-panel-detailed-info-text_js-active');
					
					setTimeout(function() {
						app.conf.projects.animationInProcess = false;
					}, app.conf.projects.stepDelay)
				},
				
				getCurrentItemNumber: function() {
					var slideIndex;
					$.each(app.conf.screensNavigator.find('.app-screen__backgrounds-list-item'), function(index, value) {
						if ($(value).hasClass('app-screen__backgrounds-list-item_js-active')) {
							slideIndex = index;
							return;
						};
					});
					
					return slideIndex;
				}
			},
			histories: {
				item: $('.app-screen__histories-item-wrapper'),		// элемент истории
				list: $('.app-screen__histories-list'),				// список с сториями
				handle: $('.app-screen__histories'),				// корневой элемент историй
				slideIndex: 0,										// идентификатор текущего элемента
				
				// правый отступ от элемента истории
				rightMargin: null,
				
				// перелистнуть историю
				moveSlide: function() {
					app.conf.histories.handle.css('height', $('.app-screen__histories-item').first().height() - 36);
					app.conf.histories.list.css('left', 0 + (app.conf.histories.item.first().width() + app.conf.histories.rightMargin) * app.conf.histories.slideIndex);
				},
				
				// перелистывание историй
				toggleSlide: function(direction) {
					switch (direction) {
						case 'prev':
							if (app.conf.histories.slideIndex >= 0) break;
							
							app.conf.histories.slideIndex++;
							app.conf.histories.moveSlide();
						break;
						case 'next':
							if (app.conf.histories.slideIndex <= ((app.conf.histories.item.length - 1) * -1)) break;
							
							app.conf.histories.slideIndex--;
							app.conf.histories.moveSlide();
						break;
					}
				}
			},
			
			contacts: {
				item: $('.app-screen__contacts-item-wrapper'),		// элемент контактов
				list: $('.app-screen__contacts-list'),				// список с контактами
				handle: $('.app-screen__contacts'),					// корневой элемент контактов
				slideIndex: 0,										// идентификатор текущего элемента
				
				// правый отступ от элемента истории
				rightMargin: null,
				
				// перелистнуть историю
				moveSlide: function() {
					app.conf.contacts.handle.css('height', $('.app-screen__contacts-item').first().height() - 36);
					app.conf.contacts.list.css('left', app.conf.contacts.slideIndex * (app.conf.contacts.item.first().width() + app.conf.contacts.rightMargin));
				},
				
				// перелистывание историй
				toggleSlide: function(direction) {
					switch (direction) {
						case 'prev':
							if (app.conf.contacts.slideIndex >= 0) break;
							
							app.conf.contacts.slideIndex++;
							app.conf.contacts.moveSlide();
						break;
						case 'next':
							if (app.conf.contacts.slideIndex <= ((app.conf.contacts.item.length - 1) * -1)) break;
							
							app.conf.contacts.slideIndex--;
							app.conf.contacts.moveSlide();
						break;
					}
				}
			},
			developer: {
				animationInProcess: false,
				slideIndex: 0,
				handle: $('.about-developer__slider'),
				item: $('.about-developer__slide'),
				
				moveSlide: function() {
					if (app.conf.developer.animationInProcess == true) return;
					
					app.conf.developer.animationInProcess = true;
					
					app.conf.developer.handle.css('left', app.conf.developer.slideIndex * -100 + '%');
					console.log(app.conf.developer.slideIndex);
					
					setTimeout(function() {
						app.conf.developer.animationInProcess = false;
					}, 500)
				},
				toggleSlide: function(direction) {
					switch (direction) {
						case 'prev':
							if (app.conf.developer.slideIndex <= 0) return;
							
							app.conf.developer.slideIndex--;
							app.conf.developer.moveSlide();
						break;
						case 'next':
							if (app.conf.developer.slideIndex >= app.conf.developer.item.length - 1) return;
							
							app.conf.developer.slideIndex++;
							app.conf.developer.moveSlide();
						break;
					}
				}
			}
		};
		
		$('.modal-window__overlay').click(function(event) {
			if (event.target == $(this).get(0)) {
				$('.modal-window').hide();
				$('.about-developer .modal-window__body').hide();
			}
		})
		
		$('.modal-window__close-button').click(function() {
			$('.modal-window').hide();
			$('.about-developer .modal-window__body').hide();
		})
		
		$.each($('.about-developer__workers-item'), function(index, value) {
			$(value).click(function() {
				$('.about-developer .modal-window').show();
				$('.about-developer .modal-window__body').eq(index).show();
			})
		})
		
		if ($('.app-screen__histories-item-wrapper').length > 0) {
			app.conf.contacts.rightMargin = parseInt($('.app-screen__contacts-item-wrapper').first().css('margin-right').replace('px', ''));
		}
		
		if ($('.app-screen__histories-item-wrapper').length > 0) {
			app.conf.histories.rightMargin = parseInt($('.app-screen__histories-item-wrapper').first().css('margin-right').replace('px', ''));
		}
		
		// блоки в сториях и контактах будут выводиться всегда по центру вне зависимости от высоты экрана
		app.conf.histories.handle.css('height', $('.app-screen__histories-item').first().height() - 36);
		app.conf.contacts.handle.css('height', $('.app-screen__contacts-item').first().height() - 36);
		
		$.each($('.app-screen__projects-nav-item'), function(index, value) {
			$(value).on('click', function() {
				app.conf.projects.setActiveItem(index);
			})
		});
		
		app.conf.projects.backgroundsList.handle.on('mousewheel wheel', function(event) {
			if (event.originalEvent.deltaY < 0) {
				app.conf.projects.setActiveItem(app.conf.projects.getCurrentItemNumber() - 1);
			} else {
				app.conf.projects.setActiveItem(app.conf.projects.getCurrentItemNumber() + 1);
			}
		})
		
		
		$.each($('.sidebar-menu__house'), function(index, value) {
			$(value).on('click', function() {
				app.openSidebarMenu();
				app.setActiveScreen($('.app-screens-list'), 1);
				app.conf.projects.setActiveItem(index);
			})
		})
		
		
		app.conf.hamburgerMenu.on('click', function() {
			app.openSidebarMenu();
			$('.sidebar-menu').show();
		});
		
		app.conf.sidebarOverlay.on('click', function() {
			app.openSidebarMenu();
		});
		
		$('.app-screen_home').on('mousewheel wheel', function() {
			app.nextScreem(app.conf.screensNavigator);
		});
		
		// app.setActiveScreen(app.conf.screensNavigator, 3);
		
		// todo: переписать дублирующийся код
		app.conf.developer.handle.on('mousewheel wheel', function(event) {
			if (event.originalEvent.deltaY < 0) {
				if (app.conf.developer.animationInProcess == true) return;
		
				app.conf.screenInProcess = true;
				
				setTimeout(function() {
					app.conf.screenInProcess = false;
				}, 500)
				
				app.conf.developer.toggleSlide('prev');
			} else {
				if (app.conf.developer.animationInProcess == true) return;
		
				app.conf.screenInProcess = true;
				
				setTimeout(function() {
					app.conf.screenInProcess = false;
				}, 500)
				
				app.conf.developer.toggleSlide('next');
			}
		})
		
		app.conf.histories.handle.on('mousewheel wheel', function(event) {
			if (event.originalEvent.deltaY < 0) {
				app.conf.histories.toggleSlide('prev');
			} else {
				app.conf.histories.toggleSlide('next');
			}
		})
		
		app.conf.contacts.handle.on('mousewheel wheel', function(event) {
			if (event.originalEvent.deltaY < 0) {
				app.conf.contacts.toggleSlide('prev');
			} else {
				app.conf.contacts.toggleSlide('next');
			}
		})
	},
	
	getActiveScreenHandle: function(navigator) {
		return navigator.find('.app-screen_js-active')
	},
	
	getActiveScreenNumber: function(navigator) {
		var slideIndex;
		$.each(app.conf.screensNavigator.find('.app-screen'), function(index, value) {
			if ($(value).hasClass('app-screen_js-active')) {
				slideIndex = index;
			};
		});
		
		return slideIndex;
	},
	
	setActiveScreen: function(navigator, screenId) {
		if (screenId > navigator.find('.app-screen').length ||
			typeof screenId !== 'number'
		) return;
		
		if (app.conf.screenInProcess == true) return;
		
		app.conf.screenInProcess = true;
		
		navigator.find('.app-screen').removeClass('app-screen_js-active');
		$(navigator.find('.app-screen')[screenId]).addClass('app-screen_js-active');
		
		setTimeout(function() {
			app.conf.screenInProcess = false;
		}, 500)
	},
	
	nextScreem: function(navigator) {
		if (!navigator) return;
		if (app.getActiveScreenNumber(navigator) > navigator.find('.app-screen').length) return;
		app.setActiveScreen(navigator, app.getActiveScreenNumber() + 1);
	},
	
	openSidebarMenu: function() {
		
		if (!app.conf.sidebarMenu.hasClass('sidebar-menu__body_js-opened sidebar-menu__body_js-closed')) {
			app.conf.sidebarMenu.addClass('sidebar-menu__body_js-closed');
			app.conf.sidebarOverlay.removeClass('sidebar-menu__overlay_js-shaded');
		};
		
		if (app.conf.sidebarMenu.hasClass('sidebar-menu__body_js-opened')) {
			app.conf.sidebarMenu.removeClass('sidebar-menu__body_js-opened').addClass('sidebar-menu__body_js-closed');
			app.conf.sidebarOverlay.removeClass('sidebar-menu__overlay_js-shaded');
			
			setTimeout(function() {
				$('.sidebar-menu').hide();
			}, 500)
		} else if (app.conf.sidebarMenu.hasClass('sidebar-menu__body_js-closed')) {
			app.conf.sidebarMenu.addClass('sidebar-menu__body_js-opened').removeClass('sidebar-menu__body_js-closed');
			app.conf.sidebarOverlay.addClass('sidebar-menu__overlay_js-shaded');
		}
	}
};
$(document).ready( app.init );