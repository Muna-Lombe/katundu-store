export class ClassWatcher {

  constructor(targetNode, classToWatch, classAddedCallback, classRemovedCallback) {
    this.targetNode = targetNode
    this.classToWatch = classToWatch
    this.classAddedCallback = classAddedCallback
    this.classRemovedCallback = classRemovedCallback
    this.observer = null
    this.lastClassState = targetNode.classList.contains(this.classToWatch)

    this.init()
  }

  init() {
    this.observer = new MutationObserver(this.mutationCallback)
    this.observe()
  }

  observe() {
    this.observer.observe(this.targetNode, { attributes: true })
  }

  disconnect() {
    this.observer.disconnect()
  }

  mutationCallback = mutationsList => {
    // console.log("class", mutationsList);
    for (let mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        let currentClassState = mutation.target.classList.contains(this.classToWatch)
        if (this.lastClassState !== currentClassState) {
          this.lastClassState = currentClassState
          if (currentClassState) {
            this.classAddedCallback()
          }
          else {
            this.classRemovedCallback()
          }
        }
      }
    }
  }
}

export class AttributeWatcher {
  constructor (
    targetNode,
    attributeToWatch,
    attributeAddedCallback,
    attributeRemovedCallback
  ) {
    this.targetNode = targetNode
    this.attributeToWatch = attributeToWatch
    this.attributeAddedCallback = attributeAddedCallback
    this.attributeRemovedCallback = attributeRemovedCallback
    this.observer = null
    this.lastAttributeState = this.targetNode.hasAttribute(this.attributeToWatch)
    // console.log("state", this.lastAttributeState)
    this.lastCallbackTime = new Date().getTime()
    this.init()
  }

  init () {
    this.observer = new MutationObserver(this.mutationCallback)
    this.observe()
  }
  
  observe () {
    this.observer.observe(
      this.targetNode, 
      { 
        attributes: true, 
        attributeFilter: [this.attributeToWatch],
         
      }
    )
    // console.log("oberserv called")
  }

  disconnect () {
    this.observer.disconnect()
  }

  mutationCallback = mutationsList => {
    // console.log("dsfsd",mutationsList)
    for (let mutation of mutationsList) {
      // console.log("",mutation)
      
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === this.attributeToWatch
      ) {
        let currentAttributeState = mutation.target.hasAttribute(this.attributeToWatch)
        if ((this.lastAttributeState !== currentAttributeState)) {
          // this.lastCallbackTime = new Date().getTime()
          this.lastAttributeState = currentAttributeState
          if (currentAttributeState) {
            this.attributeAddedCallback()
          } else {
            this.attributeRemovedCallback()
          }
        }
      }
    }
  }
}
