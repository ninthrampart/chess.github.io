(function ($) {
    $(function () {
            function getStatus(statusName) {
                var statuses = {
                    'Свободно': 'free',
                    'Бронь': 'reserved',
                    'Оценка': 'sold',
                    'Клиентский резерв': 'sold',
                    'Стратегический резерв': 'sold',
                    'Продажа': 'sold'
                };
                return statuses[statusName];
            }

            var history, properties_array = {};

            window.open_projects_page = function open_projects_page() {

                var $projectPage = $('#project-page');
                $projectPage.find('.project-grid').html('');

                $.getJSON('projects.json')
                    .done(function (data) {
                        $projectPage.removeClass('hide');

                        if ('project' in data && data.project.length !== 0) {
                            $.each(data.project, function (index, project) {
                                var $projectItem = $('<div>', {
                                    class: 'project-item',
                                    append: $('<a>', {
                                        class: 'project-card',
                                        href: '#',
                                        'data-project-id': project.id,
                                        append: $('<div>', {
                                            class: 'project-card-title-container',
                                            append: $('<div>', {
                                                class: 'project-card-title',
                                                text: project.name
                                            }).add($('<div>', {
                                                class: 'project-card-subtitle',
                                                text: project.address
                                            }))
                                        }).add($('<div>', {
                                            class: 'project-card-image-container',
                                            append: $('<img>', {
                                                class: 'project-card-image',
                                                src: project.image_url
                                            })
                                        })).add($('<div>', {
                                            class: 'project-card-description-container',
                                            append: $('<div>', {
                                                class: 'project-card-description',
                                                text: project.description
                                            }).add($('<div>', {
                                                class: 'project-card-space',
                                                append: 'от <span class="project-card-space-min">' + project.space_min + '</span> до <span class="project-card-space-max">' + project.space_max + '</span> м<sup>2</sup>'
                                            })).add($('<div>', {
                                                class: 'project-card-cost',
                                                append: 'от <span class="project-card-cost-min">' + project.cost_min + '</span> до <span class="project-card-cost-max">' + project.cost_max + '</span> м<sup>2</sup>'
                                            }))
                                        }))
                                    })
                                });

                                $projectPage.find('.project-grid').append($projectItem);

                            });
                        } else {
                            console.log('Нет объектов');
                        }
                    })
                    .fail(function () {
                        console.log('Ошибка');
                    });
            };

            window.open_houses_page = function open_houses_page() {
                var projectId = $(this).data('project-id');

                var $housePage = $('#house-page');
                $housePage.find('.house-grid').html('');

                $.getJSON('houses.json')
                    .done(function (data) {
                        $housePage.removeClass('hide');

                        if ('housing' in data && data.housing.length !== 0) {
                            $.each(data.housing, function (index, house) {
                                var $vblocks = $('<div>', {
                                    class: 'house-card-blocks-container'
                                });
                                $.each(house.blocks, function (key, block) {
                                    $vblocks.append($('<a>', {
                                        class: 'house-block',
                                        href: '#',
                                        text: block.block_type,
                                        'data-block-id': block.id,
                                    }));
                                });
                                var $houseItem = $('<div>', {
                                    class: 'house-item',
                                    append: $('<div>', {
                                        class: 'house-card',
                                        // href: '#',
                                        'data-house-id': house.id,
                                        append: $('<div>', {
                                            class: 'house-card-title-container',
                                            append: $('<div>', {
                                                class: 'house-card-title',
                                                text: house.name
                                            }).add($('<div>', {
                                                class: 'house-card-date',
                                                append: $('<div>', {
                                                    class: 'house-card-data-mark',
                                                    text: house.plan_date
                                                })
                                            }))
                                        }).add($('<div>', {
                                            class: 'house-card-image-container',
                                            append: $('<img>', {
                                                class: 'house-card-image',
                                                src: house.image_url
                                            })
                                        })).add($vblocks
                                        ).add($('<div>', {
                                            class: 'house-card-description-container',
                                            append: $('<div>', {
                                                class: 'house-card-description',
                                                append: $('<div>', {
                                                    class: 'house-card-floors',
                                                    text: house.count_floor + ' Этажей'
                                                }).add($('<div>', {
                                                    class: 'house-card-type',
                                                    text: house.type
                                                }))
                                            }).add($('<div>', {
                                                class: 'house-card-space',
                                                append: 'от <span class="house-card-space-min">' + house.space_min + '</span> до <span class="house-card-space-max">' + house.space_max + '</span> м<sup>2</sup>'
                                            })).add($('<div>', {
                                                class: 'house-card-cost',
                                                append: 'от <span class="house-card-cost-min">' + house.cost_min + '</span> до <span class="house-card-cost-max">' + house.cost_max + '</span> м<sup>2</sup>'
                                            }))
                                        }))
                                    })
                                });

                                $housePage.find('.house-grid').append($houseItem);

                            });
                        } else {
                            console.log('Нет объектов');
                        }
                    })
                    .fail(function () {
                        console.log('Ошибка');
                    });
            };

            window.open_properties_page = function open_properties_page() {
                var blockId = $(this).data('block-id');

                var $propertyPage = $('#property-page');
                $propertyPage.find('.property-grid-box').html('');


                $.getJSON('block.json')
                    .done(function (data) {
                        $propertyPage.removeClass('hide');

                        if ('section' in data && data.section.length !== 0) {
                            var $propertyGridContent = $('<div>', {
                                    class: 'property-box-inner',
                                }),
                                $propertyGridLines = $('<div>', {
                                    class: 'property-floors-lines'
                                }),
                                $propertyGridRight = $('<div>', {
                                    class: 'property-floors-line-right'
                                }),
                                $propertyGridLeft = $('<div>', {
                                    class: 'property-floors-line-left'
                                }),
                                gridArray = [],
                                sectionNumber = 0,
                                maxInSection = [],
                                lastFloor,
                                firstFloor;

                            $.each(data.section, function (i, section) {
                                ++sectionNumber;
                                maxInSection[sectionNumber] = 0;

                                $.each(section.property, function (j, property) {
                                    if (lastFloor == undefined || lastFloor < property.floor) {
                                        lastFloor = parseInt(property.floor);
                                    }
                                    if (firstFloor == undefined || firstFloor > property.floor) {
                                        firstFloor = parseInt(property.floor);
                                    }
                                    if (!(property.floor in gridArray)) {
                                        gridArray[property.floor] = [];
                                    }
                                    if (!(sectionNumber in gridArray[property.floor])) {
                                        gridArray[property.floor][sectionNumber] = [];
                                    }
                                    gridArray[property.floor][sectionNumber].push(property);

                                    if (maxInSection[sectionNumber] < gridArray[property.floor][sectionNumber].length) {
                                        maxInSection[sectionNumber] = gridArray[property.floor][sectionNumber].length;
                                    }


                                    properties_array[property.id] = property;
                                });
                            });

                            firstFloor = firstFloor > 0 ? firstFloor = 1 : firstFloor;
                            for (var i = lastFloor; i >= firstFloor; i--) {
                                $propertyGridLeft.append(
                                    $('<div>', {
                                        class: 'floor-line',
                                        append: $('<span>', {
                                            class: 'floor-number',
                                            text: i
                                        })
                                    })
                                );
                                $propertyGridRight.append(
                                    $('<div>', {
                                        class: 'floor-line',
                                        append: $('<span>', {
                                            class: 'floor-number',
                                            text: i
                                        })
                                    })
                                );
                                $propertyGridLines.append(
                                    $('<div>', {
                                        class: 'property-floors-line'
                                    })
                                );

                                var $floorDiv = $('<div>', {
                                    class: 'property-floor'
                                });
                                for (var j = 1; j <= sectionNumber; j++) {
                                    var $sectionDiv = $('<div>', {
                                        class: 'property-floor-section'
                                    });
                                    if (i == lastFloor) {
                                        $sectionDiv.prepend(
                                            $('<div>', {
                                                class: 'property-section-title-wrap',
                                                append: $('<div>', {
                                                    class: 'property-section-title',
                                                    text: 'Секция ' + j
                                                })
                                            })
                                        )
                                    }
                                    for (var k = 0; k <= maxInSection[j] - 1; k++) {
                                        var rooms, statusClass, $tooltip, property_id, discountClass = '';
                                        if (gridArray[i] == undefined || gridArray[i][j] == undefined || gridArray[i][j][k] == undefined) {
                                            rooms = '';
                                            statusClass = 'status-color-disabled';
                                            $tooltip = '';
                                            property_id = '';
                                        } else {
                                            var cost = 'Цена скрыта',
                                                price = '',
                                                status = getStatus(gridArray[i][j][k].status_code),
                                                property_id = gridArray[i][j][k].id;
                                            discountClass = gridArray[i][j][k].discount.length ? ' discount' : '';
                                            if (status != 'sold') {
                                                cost = gridArray[i][j][k].cost + ' ₽';
                                                price = ' - ' + gridArray[i][j][k].price + ' ₽/м<sup>2</sup>';
                                            }
                                            rooms = gridArray[i][j][k].rooms;
                                            statusClass = 'status-color-' + status;
                                            $tooltip = $('<div>', {
                                                class: 'property-tooltip',
                                                append: $('<div>', {
                                                    class: 'property-tooltip-inner',
                                                    append: $('<div>', {
                                                        class: 'property-tooltip-left',
                                                        append: $('<div>', {
                                                            class: 'property-tooltip-rooms',
                                                            text: rooms
                                                        }).add($('<div>', {
                                                            class: 'property-tooltip-number',
                                                            text: '№ ' + gridArray[i][j][k].number
                                                        }))
                                                    }).add($('<div>', {
                                                        class: 'property-tooltip-right',
                                                        append: $('<div>', {
                                                            class: 'property-tooltip-cost',
                                                            append: cost
                                                        }).add($('<div>', {
                                                            class: 'property-tooltip-info',
                                                            append: $('<span>', {
                                                                class: 'info-area',
                                                                append: gridArray[i][j][k].total_space + ' м<sup>2</sup>'
                                                            }).add($('<span>', {
                                                                class: 'info-area-price',
                                                                append: price
                                                            }))
                                                        }))
                                                    }))
                                                })
                                            });
                                        }
                                        $sectionDiv.append(
                                            $('<div>', {
                                                class: 'property-cell-wrapper ' + statusClass + discountClass,
                                                append: $('<div>', {
                                                    class: 'property-cell',
                                                    'data-property-id': property_id,
                                                    append: $('<div>', {
                                                        class: 'property-cell-element',
                                                        append: $('<div>', {
                                                            class: 'property-rooms',
                                                            text: rooms
                                                        })
                                                    })
                                                }).add($tooltip)
                                            })
                                        );
                                    }
                                    $floorDiv.append($sectionDiv);
                                }
                                $propertyGridContent.append($floorDiv);
                            }

                            $propertyPage.find('.property-grid-box')
                                .append($propertyGridLeft)
                                .append($propertyGridRight)
                                .append($propertyGridLines)
                                .append(
                                    $('<div>', {
                                        class: 'property-box',
                                        id: 'property-grid-content',
                                        append: $('<div>', {
                                            class: 'property-box-scroll',
                                            append: $propertyGridContent
                                        })
                                    })
                                );


                        } else {
                            console.log('Нет объектов');
                        }
                    })
                    .fail(function () {
                        console.log('Ошибка');
                    });
            };

            var $widget = $('#widget-catalog');

            //Отркытие виджета
            $('#open-catalog').on('click', function (e) {
                e.preventDefault();
                $widget.addClass('open');
                $('body').css('overflow', 'hidden');
                $('.widget-catalog-content').removeClass('aside-show');
                $('.aside-container').removeClass('show');
                $('.center-breadcrumb').html('');

                $widget.find('.widget-catalog-page').addClass('hide');
                history = [];
                $widget.find('.widget-catalog-objects').data('page', 'projects');
                window['open_projects_page']();
            });

            //Закрытие виджета
            $widget.on('click', '#close-link', function (e) {
                e.preventDefault();
                $('body').css('overflow', 'auto');
                $widget.find('.widget-catalog-page').addClass('hide');
                $('#widget-catalog').removeClass('open');
            });

            $widget.on('click', '#home-link', function (e) {
                e.preventDefault();
                if ($widget.find('.widget-catalog-objects').data('page') != 'projects') {
                    $('.widget-catalog-content').removeClass('aside-show');
                    $('.aside-container').removeClass('show');
                    $widget.find('.widget-catalog-page').addClass('hide');
                    history.push({
                        page: $widget.find('.widget-catalog-objects').data('page'),
                        title: $widget.find('.center-breadcrumb').html()
                    });
                    $widget.find('.widget-catalog-objects').data('page', 'projects');
                    $('.center-breadcrumb').html('');
                    window['open_projects_page']();
                }
            });

            $widget.on('click', '#back-link', function (e) {
                e.preventDefault();
                if (history.length) {
                    $('.widget-catalog-content').removeClass('aside-show');
                    $('.aside-container').removeClass('show');
                    $widget.find('.widget-catalog-page').addClass('hide');
                    var back = history.pop();
                    $widget.find('.center-breadcrumb').html(back.title);
                    $widget.find('.widget-catalog-objects').data('page', back.page);
                    window['open_' + back.page + '_page']();
                }
            });

            $widget.on('click', '#project-page .project-card', function (e) {
                var $this = $(this);
                e.preventDefault();
                $('.widget-catalog-content').removeClass('aside-show');
                $('.aside-container').removeClass('show');
                $widget.find('.widget-catalog-page').addClass('hide');
                history.push({
                    page: $widget.find('.widget-catalog-objects').data('page'),
                    title: $widget.find('.center-breadcrumb').html()
                });
                $widget.find('.widget-catalog-objects').data('page', 'houses');


                $('.center-breadcrumb').html(
                    $('<div>', {
                        class: 'breadcrumb-project',
                        append:
                            $('<span>', {
                                class: 'breadcrumb-project-name',
                                text: $this.find('.project-card-title').text()
                            }).add($('<span>', {
                                class: 'breadcrumb-project-address',
                                text: $this.find('.project-card-subtitle').text()
                            }))
                    })
                );

                window['open_houses_page']();
            });

            $widget.on('click', '#house-page .house-block', function (e) {
                e.preventDefault();
                var $this = $(this);
                $('.widget-catalog-content').removeClass('aside-show');
                $('.aside-container').removeClass('show');
                $widget.find('.widget-catalog-page').addClass('hide');
                $('.center-breadcrumb').data('date', $this.parents('.house-card').find('.house-card-data-mark').text());
                history.push({
                    page: $widget.find('.widget-catalog-objects').data('page'),
                    title: $widget.find('.center-breadcrumb').html()
                });
                $widget.find('.widget-catalog-objects').data('page', 'properties');
                // $('.center-breadcrumb').append(
                //     $('<div>', {
                //         class: 'breadcrumb-house',
                //         append: $('<span>', {
                //             class: 'breadcrumb-house-name',
                //             text: $this.parents('.house-card').find('.house-card-title').text()
                //         }).add($('<span>', {
                //             class: 'breadcrumb-house-block',
                //             text: $this.text()
                //         }))
                //
                //     })
                // );
                window['open_properties_page']();
            });

            $widget.on('click', '.property-cell', function () {
                var $this = $(this);

                if (!$this.parent().hasClass('status-color-disabled')) {
                    var property_id = $this.data('property-id'),
                        hidePrice = $this.parents('.property-cell-wrapper').hasClass('status-color-sold') ? 1 : 0;
                    $('#property-grid-content').find('.property-cell').removeClass('selected');
                    $this.addClass('selected');
                    $('.property-floors-line').removeClass('property-floors-line_selected');
                    $('.property-floors-lines').children().eq($(this).parents('.property-floor').index()).addClass('property-floors-line_selected');

                    $('.widget-catalog-content').addClass('aside-show');
                    $('.aside-container').addClass('show').find('.property-card-wrapper').html(
                        $('<div>', {
                            class: 'property-card',
                            append: $('<div>', {
                                class: 'property-image-wrapper',
                                append: $('<img>', {
                                    class: 'property-image',
                                    src: properties_array[property_id].layout_url
                                })
                            }).add(hidePrice ? '' : $('<div>', {
                                class: 'property-request-wrapper',
                                append: $('<a>', {
                                    class: 'property-request-button',
                                    href: '#',
                                    text: 'Заявка на квартиру'
                                })
                            })).add(hidePrice ? '' : $('<table>', {
                                class: 'property-price-wrapper',
                                append: $('<tbody>', {
                                    append: $('<tr>', {
                                        append: $('<td>', {
                                            class: 'property-cost',
                                            append: properties_array[property_id].cost + ' ₽'
                                        }).add($('<td>', {
                                            class: 'property-price',
                                            append: properties_array[property_id].price + ' ₽/м<sup>2</sup>'
                                        }))
                                    }).add(
                                        properties_array[property_id].discount.length ?
                                            $('<tr>', {
                                                append: $('<td>', {
                                                    class: 'property-discount-name',
                                                    append: properties_array[property_id].discount[0].name
                                                }).add($('<td>', {
                                                    class: 'property-discount-percent',
                                                    append: properties_array[property_id].discount[0].percent + ' %'
                                                }))
                                            }).add($('<tr>', {
                                                append: $('<td>', {
                                                    class: 'property-cost',
                                                    append: '123456 ₽'
                                                }).add($('<td>', {
                                                    class: 'property-price',
                                                    append: '32165 ₽/м<sup>2</sup>'
                                                }))
                                            })) : ''
                                    )
                                })
                            })).add($('<table>', {
                                class: 'property-info',
                                append: $('<tbody>', {
                                    append: $('<tr>', {
                                        append: $('<td>', {
                                            class: 'property-name',
                                            text: 'Номер помещения'
                                        }).add($('<td>', {
                                            class: 'property-value',
                                            text: properties_array[property_id].number
                                        }))
                                    }).add($('<tr>', {
                                        append: $('<td>', {
                                            class: 'property-name',
                                            append: 'Адрес'
                                        }).add($('<td>', {
                                            class: 'property-value',
                                            text: $widget.find('.breadcrumb-project-address').text()
                                        }))
                                    })).add($('<tr>', {
                                        append: $('<td>', {
                                            class: 'property-name',
                                            append: 'Срок сдачи'
                                        }).add($('<td>', {
                                            class: 'property-value',
                                            text: $('.center-breadcrumb').data('date')
                                        }))
                                    })).add($('<tr>', {
                                        append: $('<td>', {
                                            class: 'property-name',
                                            append: 'Этаж'
                                        }).add($('<td>', {
                                            class: 'property-value',
                                            text: properties_array[property_id].floor
                                        }))
                                    })).add($('<tr>', {
                                        append: $('<td>', {
                                            class: 'property-name',
                                            append: 'Общая площадь'
                                        }).add($('<td>', {
                                            class: 'property-value',
                                            text: properties_array[property_id].total_space
                                        }))
                                    })).add($('<tr>', {
                                        append: $('<td>', {
                                            class: 'property-name',
                                            append: 'Жилая площадь'
                                        }).add($('<td>', {
                                            class: 'property-value',
                                            text: properties_array[property_id].residential_space
                                        }))
                                    })).add($('<tr>', {
                                        append: $('<td>', {
                                            class: 'property-name',
                                            append: 'Комнатность'
                                        }).add($('<td>', {
                                            class: 'property-value',
                                            text: properties_array[property_id].rooms
                                        }))
                                    })).add($('<tr>', {
                                        append: $('<td>', {
                                            class: 'property-name',
                                            append: 'Самоотделка'
                                        }).add($('<td>', {
                                            class: 'property-value',
                                            text: properties_array[property_id].furnish ? 'ДА' : 'НЕТ'
                                        }))
                                    })).add($('<tr>', {
                                        append: $('<td>', {
                                            class: 'property-name',
                                            append: 'Название ЖК'
                                        }).add($('<td>', {
                                            class: 'property-value',
                                            text: $widget.find('.breadcrumb-project-name').text()
                                        }))
                                    }))
                                })
                            }))
                        })
                    );
                }
            });

            $widget.on('click', '#close-aside', function (e) {
                e.preventDefault();
                $('.widget-catalog-content').removeClass('aside-show');
                $('.aside-container').removeClass('show').find('.property-card-wrapper').html('');
            });

            $widget.on('mouseover', '.property-floor', function () {
                $('.property-floors-line').removeClass('property-floors-line_hovered');
                $('.property-floors-lines').children().eq($(this).index()).addClass('property-floors-line_hovered');
            });

            $widget.on('mouseover', '.floor-line', function () {
                $('.property-floors-line').removeClass('property-floors-line_hovered');
                $('.property-floors-lines').children().eq($(this).index()).addClass('property-floors-line_hovered');
            });

            $('.rcheckbox > input').on('change', function () {
                var $this = $(this);
                if ($this.is(":checked")) {
                    $this.parent().addClass('active');
                } else {
                    $this.parent().removeClass('active');
                }
            });

            $widget.on('click', '#submit_filter', function (e) {
                e.preventDefault();
            });


// $('#property-grid-content').find('.property-floor').on{('mouseover', function () {
//     $('#property-grid-content').find('.property-floor').removeClass('property-floor_hovered');
//     $(this).addClass('property-floor_hovered');
//
// });
// $('#property-grid-content').find('.property-floor').on('click', function () {
//     $('#property-grid-content').find('.property-floor').removeClass('property-floor_selected');
//     $(this).addClass('property-floor_selected');
//
// });

        }
    )
    ;
})
(jQuery);
