!(function (t) {
  var e,
    n,
    c,
    o,
    i,
    l =
      '<svg><symbol id="icon-xiangji" viewBox="0 0 1024 1024"><path d="M846.525959 288.822035 733.689055 288.822035l-48.477085-116.694769c-11.257391-27.103288-37.495986-44.61615-66.845431-44.61615L408.757614 127.511115c-29.348422 0-55.587016 17.512862-66.845431 44.61615l-48.475038 116.694769L180.598194 288.822035c-62.71946 0-113.7456 51.02614-113.7456 113.7456l0 378.463658c0 62.71946 51.02614 113.7456 113.7456 113.7456l665.927765 0c62.71946 0 113.7456-51.02614 113.7456-113.7456L960.27156 402.567635C960.27156 339.847152 909.24542 288.822035 846.525959 288.822035zM918.909523 781.030269c0 39.912012-32.471552 72.383564-72.383564 72.383564L180.598194 853.413833c-39.913035 0-72.383564-32.471552-72.383564-72.383564L108.21463 402.567635c0-39.912012 32.470529-72.383564 72.383564-72.383564l126.641305 0c8.357342 0 15.892969-5.02955 19.098987-12.748349l53.770648-129.443118c4.824889-11.614525 16.070001-19.120476 28.64848-19.120476l209.608925 0c12.57848 0 23.823592 7.504928 28.646434 19.1215l53.772694 129.443118c3.207042 7.716752 10.742668 12.747325 19.10001 12.747325l126.641305 0c39.912012 0 72.383564 32.471552 72.383564 72.383564L918.910547 781.030269z"  ></path><path d="M513.561565 349.83769c-115.843378 0-210.089879 94.245478-210.089879 210.089879s94.245478 210.089879 210.089879 210.089879 210.089879-94.245478 210.089879-210.089879S629.405967 349.83769 513.561565 349.83769zM513.561565 728.655412c-93.036953 0-168.727843-75.691913-168.727843-168.727843s75.69089-168.727843 168.727843-168.727843c93.03593 0 168.727843 75.691913 168.727843 168.727843S606.598518 728.655412 513.561565 728.655412z"  ></path><path d="M456.241069 644.973524c-28.319999-19.131733-45.227064-50.924833-45.227064-85.046978 0-11.42112-9.258874-20.681018-20.681018-20.681018s-20.681018 9.259898-20.681018 20.681018c0 47.879474 23.713075 92.484368 63.433728 119.319549 3.549849 2.397606 7.574512 3.546779 11.559267 3.546779 6.638187 0 13.159718-3.190669 17.154705-9.106402C468.193285 664.222937 465.704604 651.368164 456.241069 644.973524z"  ></path><path d="M263.747963 381.095601l-86.860277 0c-11.422144 0-20.681018 9.258874-20.681018 20.681018s9.258874 20.681018 20.681018 20.681018l86.860277 0c11.422144 0 20.681018-9.258874 20.681018-20.681018S275.170107 381.095601 263.747963 381.095601z"  ></path></symbol></svg>',
    d = (d = document.getElementsByTagName('script'))[
      d.length - 1
    ].getAttribute('data-injectcss'),
    a = function (t, e) {
      e.parentNode.insertBefore(t, e);
    };
  if (d && !t.__iconfont__svg__cssinject__) {
    t.__iconfont__svg__cssinject__ = !0;
    try {
      document.write(
        '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>',
      );
    } catch (t) {
      console && console.log(t);
    }
  }
  function s() {
    i || ((i = !0), c());
  }
  function r() {
    try {
      o.documentElement.doScroll('left');
    } catch (t) {
      return void setTimeout(r, 50);
    }
    s();
  }
  (e = function () {
    var t, e;
    ((e = document.createElement('div')).innerHTML = l),
      (l = null),
      (t = e.getElementsByTagName('svg')[0]) &&
        (t.setAttribute('aria-hidden', 'true'),
        (t.style.position = 'absolute'),
        (t.style.width = 0),
        (t.style.height = 0),
        (t.style.overflow = 'hidden'),
        (e = t),
        (t = document.body).firstChild ? a(e, t.firstChild) : t.appendChild(e));
  }),
    document.addEventListener
      ? ~['complete', 'loaded', 'interactive'].indexOf(document.readyState)
        ? setTimeout(e, 0)
        : ((n = function () {
            document.removeEventListener('DOMContentLoaded', n, !1), e();
          }),
          document.addEventListener('DOMContentLoaded', n, !1))
      : document.attachEvent &&
        ((c = e),
        (o = t.document),
        (i = !1),
        r(),
        (o.onreadystatechange = function () {
          'complete' == o.readyState && ((o.onreadystatechange = null), s());
        }));
})(window);
