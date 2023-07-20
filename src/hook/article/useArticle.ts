import { ArticleMenu } from "@/constants/types";
import { onMounted, reactive, toRefs } from "vue"
import useScrollMenu from '../common/useScrollMenu';
export default function () {
  const state:{
    content: string;
    menu: ArticleMenu[];
    activeMenuIndex: number;
    minMenuLevel: number;
  } = reactive({
    content: '',
    menu: [],
    activeMenuIndex: 0,
    minMenuLevel: 1
  })
  
  const { isScrollingDown, getScrollDirection } = useScrollMenu()
  
  const extractHTags = (htmlString: string):ArticleMenu[] => {
    const pattern = /<h([1-6])[^>]*>(.*?)<\/h\1>/gi;
    const hTags = [];
    let match;
  
    while ((match = pattern.exec(htmlString)) !== null) {
      const tagLevel = match[1];
      const tagContent = match[2];
      hTags.push({ level: Number(tagLevel), content: tagContent });
    }
  
    return hTags;
  }

  const setMenuStyle = (menuItem: ArticleMenu) => {
    return {
      paddingLeft: `${(menuItem.level - state.minMenuLevel) * 8}px`,
      color: menuItem.level > 2 ? '#515767' : '#252933'
    }
  }

  const handleScroll = (e: Event) => {
    getScrollDirection(e)
    const menuList = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    
  }

  onMounted(() => {
    state.content = "<h2 id=\"promise\">promise</h2>\n<p>一个 <code>Promise</code> 必然处于以下几种状态之一：</p>\n<ul>\n<li><strong>等待（pending）</strong> : 初始状态，既没有被兑现，也没有被拒绝。</li>\n<li><strong>成功（fulfilled）</strong> : 意味着操作成功完成。</li>\n<li><strong>失败（rejected）</strong> : 意味着操作失败。</li>\n</ul>\n<p>我们来看看原生promise</p>\n<pre><code class=\"language-js\">var p0 = new Promise((resolve,reject) =&gt; {\n})\nvar p1 = new Promise((resolve,reject) =&gt; {\n    resolve(&#39;成功&#39;)\n})\nvar p2 = new Promise((resolve,reject) =&gt; {\n  reject(&#39;失败&#39;)\n})\nvar p3 = new Promise((resolve,reject) =&gt; {\n  resolve(&#39;成功&#39;)\n  reject(&#39;失败&#39;)\n})\n \nconsole.log(p0, p1, p2, p3)\n</code></pre>\n<p><img src=\"https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3e5d38b1ac340048620ba9363cfdf73~tplv-k3u1fbpfcp-watermark.image?\" alt=\"image.png\"></p>\n<p>通过输出结果我们可以总结出</p>\n<ul>\n<li>当没有执行<code>resolve</code>或者<code>reject</code>时，PromiseState是<code>pending</code>状态</li>\n<li>当执行<code>resolve</code>或者<code>reject</code>时，PromiseState会变成相应的成功或失败状态</li>\n<li>状态只能由 <code>Pending --&gt; fulfilled</code> 或者 <code>Pending --&gt; rejected</code>，且一但发生改变便不可<strong>二次</strong>修改</li>\n</ul>\n<hr>\n<p>根据上面的总结，我们来一一实现</p>\n<pre><code class=\"language-js\">class MyPromise {\n  constructor(executor) {\n    // 初始化值\n    this.PromiseState = &#39;pending&#39;\n    this.PromiseResult = null\n    // 绑定this\n    this.resolve = this.resolve.bind(this)\n    this.reject = this.reject.bind(this)\n    // 执行传进来的函数\n    executor(this.resolve,this.reject)\n  }\n\n  resolve(value){\n  // 只能是Pending --&gt; Fulfilled\n    if(this.PromiseState === &#39;pending&#39;) {\n      this.PromiseState = &#39;fulfilled&#39;\n      this.PromiseResult = value\n    }\n  }\n  reject(reason){\n  // 只能是Pending --&gt; Rejected\n    if(this.PromiseState === &#39;pending&#39;) {\n      this.PromiseState = &#39;rejected&#39;\n      this.PromiseResult = reason\n    }\n  }\n}\n\n\nvar p01 = new MyPromise((resolve,reject) =&gt; {\n})\nvar p11 = new MyPromise((resolve,reject) =&gt; {\n    resolve(&#39;成功&#39;)\n})\nvar p21 = new MyPromise((resolve,reject) =&gt; {\n  reject(&#39;失败&#39;)\n})\n</code></pre>\n<p><img src=\"https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/840b369224424138ae36373b1ddecb7c~tplv-k3u1fbpfcp-watermark.image?\" alt=\"image.png\"></p>\n<p>可以发现已经实现了简单的功能</p>\n<h3 id=\"then\">then</h3>\n<p>看看原生的promise的then</p>\n<pre><code class=\"language-js\">var p1 = new Promise((resolve,reject) =&gt; { resolve(&#39;成功&#39;) })\nvar p2 = new Promise((resolve,reject) =&gt; { reject(&#39;失败&#39;) })\nvar p3 = new Promise((resolve,reject) =&gt; {\n    setTimeout(() =&gt; {\n        resolve(&#39;成功&#39;)\n    },3000)\n})\np1.then(res =&gt; {console.log(res)}, err =&gt; {console.log(err)}) // 输出：成功\np2.then(res =&gt; {console.log(res)}, err =&gt; {console.log(err)}) // 输出：失败\np3.then(res =&gt; {console.log(res)}, err =&gt; {console.log(err)}) // 3s后输出：成功\n</code></pre>\n<ul>\n<li>then接收两个回调函数，一个是<code>成功回调</code>，一个是<code>失败回调</code></li>\n<li>当<code>resolve</code>或<code>reject</code>遇到定时器时,等待定时器<code>结束</code>后才执行<code>then</code></li>\n</ul>\n<p>遇到定时器等异步操作的时候的思路</p>\n<ul>\n<li>当执行<code>then</code>的时候状态是<code>pending</code>就代表遇到了异步操作，需要保存<code>then</code>里的<strong>回调</strong>在数组里</li>\n<li>当定时器结束的时候再执行存储回调数组</li>\n</ul>\n<pre><code class=\"language-js\">class MyPromise {\n  constructor(executor) {\n    // 初始化值\n    this.PromiseState = &#39;pending&#39;\n    this.PromiseResult = null\n    // 异步存储回调 -----新增代码\n    this.onFulfilledCallBack = []\n    this.onRejectedCallBack = []\n    // 绑定this\n    this.resolve = this.resolve.bind(this)\n    this.reject = this.reject.bind(this)\n    // 执行传进来的函数\n    executor(this.resolve,this.reject)\n  }\n\n  resolve(value){\n    if(this.PromiseState === &#39;pending&#39;) {\n      this.PromiseState = &#39;fulfilled&#39;\n      this.PromiseResult = value\n      // -----新增代码\n      while(this.onFulfilledCallBack.length) {\n        this.onFulfilledCallBack.shift()(value)\n      }\n    }\n  }\n  reject(reason){\n    if(this.PromiseState === &#39;pending&#39;) {\n      this.PromiseState = &#39;rejected&#39;\n      this.PromiseResult = reason\n      // -----新增代码\n      while(this.onRejectedCallBack.length) {\n        this.onRejectedCallBack.shift()(reason)\n      }\n    }\n  }\n  then(onFulfilled,onRejected){\n    if (this.PromiseState === &#39;fulfilled&#39;){\n      onFulfilled(this.PromiseResult)\n    } else if(this.PromiseState === &#39;rejected&#39;){\n      onRejected(this.PromiseResult)\n    } else if (this.PromiseState === &#39;pending&#39;) { // -----新增代码\n      this.onFulfilledCallBack.push(onFulfilled)\n      this.onRejectedCallBack.push(onRejected)\n    }\n  }\n}\n</code></pre>\n<p>用<strong>数组</strong>保存回调的原因：Promise 的 <code>then</code> 方法是可以被<strong>多次</strong>调用的，如下</p>\n<pre><code class=\"language-js\">var p1 = new Promise((resolve,reject) =&gt; {\n  setTimeout(() =&gt; {\n    resolve(&#39;成功&#39;)\n  },3000)\n})\np1.then(value =&gt; { \n  console.log(value + 1)\n}) \np1.then(value =&gt; {\n  console.log(value + 2)\n})\n</code></pre>\n<p>3s后输出<code>成功1</code>,<code>成功2</code></p>\n<h2 id=\"then的链式调用\">then的链式调用</h2>\n<p>怎么让promise可以一直链式的调用then呢？\n只需要在then执行返回一个<code>Promise对象</code>就行了</p>\n<pre><code class=\"language-js\">then(onFulfilled,onRejected){\n    const promise2 = new MyPromise((resolve,reject) =&gt; {\n      if (this.PromiseState === &#39;fulfilled&#39;){\n        // 保存回调的结果\n        const x = onFulfilled(this.PromiseResult)\n        resolvePromise(promise2, x, resolve, reject);\n      } else if (this.PromiseState === &#39;rejected&#39;){\n        onRejected(this.PromiseResult)\n      } else if (this.PromiseState === &#39;pending&#39;) {\n        this.onFulfilledCallBack.push(onFulfilled)\n        this.onRejectedCallBack.push(onRejected)\n      }\n    })\n    return promise2;\n}\n\nfunction resolvePromise(promise2, x,resolve,reject) {\n  // 如果相等了，说明return的是自己，抛出类型错误并返回 \n  if (promise2 === x) { \n    return reject(new TypeError(&#39;Chaining cycle detected for promise #&lt;Promise&gt;&#39;)) \n  }\n // 判断x是不是 MyPromise 实例对象\n  if (x instanceof MyPromise) {\n    x.then(resolve,reject)\n  } else {\n    resolve(x)\n  }\n}\n</code></pre>\n<p>为了加深代码的理解，我们分三种情况理解</p>\n<p><strong>1. 当then里执行的<code>不是return</code>的时候，例如</strong></p>\n<pre><code class=\"language-js\">p1.then(res =&gt; {\n  console.log(res)\n}).then(res =&gt; {\n  console.log(res)\n})\n</code></pre>\n<p>当上述代码执行到<code>const x = onFulfilled(this.PromiseResult)</code>这一句的时候相当于立即执行回调，等效于=&gt;<code>const x = ((res) =&gt; {console.log(res)})(&#39;成功&#39;)</code></p>\n<p><strong>2. 当then里return的是<code>普通变量</code>的时候，例如</strong></p>\n<pre><code class=\"language-js\">p1.then(res =&gt; {\n  return res + &#39;1&#39;\n}).then(res =&gt; {\n  console.log(res)\n})\n\n// 执行上述代码简化一下，假设resolve(&#39;成功&#39;)\nthen(onFulfilled,onRejected){\n    const promise2 = new MyPromise((resolve,reject) =&gt; {\n      if (this.PromiseState === &#39;fulfilled&#39;){\n        const x = &#39;成功1&#39;\n        resolve(x)\n      }\n    })\n    return promise2;\n}\n</code></pre>\n<p>返回一个promise，当再调用then的时候就把x的值传递过去实现了链式调用</p>\n<p><strong>3. 当then里return的是<code>promise</code>对象的时候，例如</strong></p>\n<pre><code class=\"language-js\">var p1 = new MyPromise((resolve,reject) =&gt; {\n    resolve(&#39;成功&#39;)\n})\nvar p2 = new MyPromise((resolve,reject) =&gt; {\n  resolve(&#39;成功&#39;)\n})\n\np1.then(res =&gt; {\n  return new Promise((resolve, reject) =&gt;{\n    resolve(res + &#39;-p1.then成功&#39;)\n  })\n}).then(res =&gt; {\n  console.log(res)\n})\n\np2.then(res =&gt; {\n  return new Promise((resolve, reject) =&gt;{\n    reject(res + &#39;-p1.then失败&#39;)\n  })\n}).then(res =&gt; {\n  console.log(res)\n})\n</code></pre>\n<p><img src=\"https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b22c3b3d903493fadf3bff6cb6798de~tplv-k3u1fbpfcp-watermark.image?\" alt=\"image.png\"></p>\n<ul>\n<li>当返回值是promise对象时，成功则新promise的对象（即<code>promise2</code>）返回的是成功，反之则失败</li>\n</ul>\n<p>之所以在<code>resolvePromise</code>方法中,遇到promise对象调用 then 方法，是因为只有then才能知道promise返回的状态是成功还是失败。</p>\n<p><strong>4. 当then里return的是<code>promise</code>对象自己的时候，会报错。例如</strong></p>\n<pre><code>const promise = new Promise((resolve, reject) =&gt; {\n    resolve(&#39;success&#39;)\n})\n \n// 这个时候将promise定义一个p1，然后返回的时候返回p1这个promise\nconst p1 = promise.then(value =&gt; {\n   console.log(1)\n   console.log(&#39;resolve&#39;, value)\n   return p1\n})\n</code></pre>\n<p><img src=\"https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e68147986b24e25971fb3c6725e7997~tplv-k3u1fbpfcp-watermark.image?\" alt=\"image.png\"></p>\n<p>所以我们需要对这种情况进行处理</p>\n"
    state.menu = extractHTags(state.content)
    state.minMenuLevel = Math.min(...state.menu.map(item => item.level))
  })

  return {
    ...toRefs(state),
    setMenuStyle,
    handleScroll
  }
}